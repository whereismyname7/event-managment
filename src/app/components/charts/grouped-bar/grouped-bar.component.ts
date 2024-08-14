import { Component, OnInit } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { EventAttendance } from '../../../models/event-attendance';


@Component({
  selector: 'app-grouped-bar',
  templateUrl: './grouped-bar.component.html',
  styleUrl: './grouped-bar.component.css'
})
export class GroupedBarComponent implements OnInit {

  currentLang: string = '';

  attendence : EventAttendance[] = []
  chartData: {
    name: string;
    series: {
      name: string;
      value: number;
    }[]

  }[] = [];

  view: [number,number] = [540,350]

  // options
  legendPosition: LegendPosition = LegendPosition.Below;
  legend: boolean = true;
  legendTitle: string = ''

  xAxis: boolean = true;
  yAxis: boolean = true;

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0496ff','#fa5b7e']
  };

  yScaleMax: number = 20000;
  barPadding: number = 2;

  constructor(private translateService: TranslateService, private eventsService: EventsService) {
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.setDefaultLang('ar');

    const browserLang = this.translateService.getBrowserLang();
    this.currentLang = browserLang && browserLang.match(/en|ar/) ? browserLang : 'ar';
    this.translateService.use(this.currentLang);

  }
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.currentLang = this.translateService.currentLang;
      this.transformDataForChart();
    });
    this.fetchEventTypes();
  }


  fetchEventTypes(): void {
    this.eventsService.getEventAttendence().subscribe(
      (data) => {
        this.attendence = data;    
        this.transformDataForChart();
      },
      (error) => {
        console.error('Error fetching event attendence:', error);
      },
    );
  }

  transformDataForChart(): void {
    this.chartData = this.attendence.map(event => ({
      name: `${event.name}`,
      series: event.series.map(item => ({
        name: this.currentLang === 'ar' ? item.nameAr : item.nameEn,
        value: item.value
      }))
    }));
  }

}

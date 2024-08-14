import { Component, OnInit } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { TotalEvents } from '../../../models/total-events';

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrl: './stacked-bar.component.css'
})
export class StackedBarComponent implements OnInit {


  currentLang: string = '';

  events: TotalEvents[] = [];

  chartData: {
    name: string;
    series: {
      name: string;
      value: number;
    }[]

  }[] = [];

  
  view: [number,number] = [500,350]

  // options
  legendPosition: LegendPosition = LegendPosition.Below;
  legend: boolean = true;
  legendTitle: string = ''

  xAxis: boolean = true;
  yAxis: boolean = true;

  showGridLines: boolean = true; // grid lines

  // showDataLabel: boolean = true; // numbers on bars

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#61b6ab','#ae4390']
  };

  yScaleMax: number = 25000;
  barPadding: number = 25;

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
    this.eventsService.getTotalEvents().subscribe(
      (data) => {
        this.events = data;    
        this.transformDataForChart();
      },
      (error) => {
        console.error('Error fetching event attendence:', error);
      },
    );
  }

  transformDataForChart(): void {
    this.chartData = this.events.map(event => ({
      name: `${event.name}`,
      series: event.series.map(item => ({
        name: this.currentLang === 'ar' ? item.name : item.nameEn,
        value: item.value
      }))
    }));
  }

}

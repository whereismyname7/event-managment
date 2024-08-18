import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { EventAttendance } from '../../../models/event-attendance';
import { timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-grouped-bar',
  templateUrl: './grouped-bar.component.html',
  styleUrl: './grouped-bar.component.css'
})
export class GroupedBarComponent implements OnInit, AfterViewInit {

  currentLang: string = '';

  attendence: EventAttendance[] = []
  chartData: {
    name: string;
    series: {
      name: string;
      value: number;
    }[]

  }[] = [];

  view: [number, number] = [540, 350]

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
    domain: ['#0496ff', '#fa5b7e']
  };

  yScaleMax: number = 20000;
  barPadding: number = 2;
  isLoaded = false;
  fetchCounter = 0;
  fetchCounterExcceded = false;

  constructor(private translateService: TranslateService, private eventsService: EventsService, @Inject(PLATFORM_ID) private platformId: Object,) {
    this.currentLang =translateService.currentLang;

  }
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.currentLang = this.translateService.currentLang;
      this.transformDataForChart();
    });
    this.fetchEventTypes();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      timer(10000).subscribe(() => {
        if (!this.isLoaded) {
          this.fetchEventTypes2();
        }
      });
    };
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
  fetchEventTypes(): void {
    this.fetchCounter++;
    if (this.fetchCounter < 5) {
      this.eventsService.getEventAttendence().subscribe(
        (data) => {
          this.attendence = data;
          this.isLoaded = true;
          this.transformDataForChart();
        },
        (error) => {
        },
      );
    }
    else {
      timer(5000).subscribe(() => { this.fetchCounterExcceded = true; });
    }
  }
  fetchEventTypes2(): void {
    this.fetchCounter++;
    if (this.fetchCounter < 3) {
      this.eventsService.getEventAttendence().subscribe(
        (data) => {
          this.attendence = data;
          this.isLoaded = true;
          this.transformDataForChart();
        },
        (error) => {
          timer(10000).subscribe(() => { this.fetchEventTypes2(); });
        },
      );
    }
    else {
      timer(5000).subscribe(() => { this.fetchCounterExcceded = true; });
    }
  }

}

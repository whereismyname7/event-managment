import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { TotalEvents } from '../../../models/total-events';
import { timer } from 'rxjs';

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrl: './stacked-bar.component.css'
})
export class StackedBarComponent implements OnInit,AfterViewInit {


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
  isLoaded = false;
  fetchCounter = 0;
  fetchCounterExcceded = false;

  constructor(private translateService: TranslateService, private eventsService: EventsService) {
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.setDefaultLang('ar');

    const browserLang = this.translateService.getBrowserLang();
    this.currentLang = browserLang && browserLang.match(/en|ar/) ? browserLang : 'ar';
    this.translateService.use(this.currentLang);
    
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    document.addEventListener('DOMContentLoaded', () => {
      timer(10000).subscribe(() => {
        console.log('DOMContentLoaded');
        console.log(this.isLoaded);
        if (!this.isLoaded) {
          this.fetchEventTypes2();
        }
      });
    });
  }
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.currentLang = this.translateService.currentLang;
      this.transformDataForChart();
    });
    this.fetchEventTypes();
  }


  
  fetchEventTypes(): void {
    this.fetchCounter++;
    if (this.fetchCounter < 5) {
      this.eventsService.getTotalEvents().subscribe(
        (data) => {
          console.log('data');
          console.log(this.isLoaded);
          this.events = data;
          this.isLoaded = true;
          this.transformDataForChart();
        },
        (error) => {
          console.log('error');
          console.log(this.isLoaded);
          console.log(this.fetchCounter);
          // console.error('Error fetching event types:', error);
          // timer(3000).subscribe(() => {   });  
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
      this.eventsService.getTotalEvents().subscribe(
        (data) => {
          console.log('data');
          console.log(this.isLoaded);
          this.events = data;
          this.isLoaded = true;
          this.transformDataForChart();
        },
        (error) => {
          console.log('error');
          console.log(this.isLoaded);
          console.log(this.fetchCounter);
          // console.error('Error fetching event types:', error);
          timer(10000).subscribe(() => { this.fetchEventTypes2(); });
        },
      );
    }
    else {
      timer(5000).subscribe(() => { this.fetchCounterExcceded = true; });
    }
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

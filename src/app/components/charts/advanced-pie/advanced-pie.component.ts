import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { EventType } from '../../../models/event-type';
import { timer } from 'rxjs';
import { time } from 'console';

@Component({
  selector: 'app-advanced-pie',
  templateUrl: './advanced-pie.component.html',
  styleUrl: './advanced-pie.component.css'
})
export class AdvancedPieComponent implements OnInit, AfterViewInit {

  eventTypes: EventType[] = [];
  chartData: {
    name: string;
    value: number;
    extra: { code: string };
  }[] = [];
  view: [number, number] = [660, 180];
  currentLang: string = '';

  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  label: string = '';
  animations: boolean = true;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#E9C46A', '#5FB6AB']
  };
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
    console.log('init');
    console.log(this.isLoaded);

    this.translateService.onLangChange.subscribe(() => {
      this.currentLang = this.translateService.currentLang;
      this.transformDataForChart();
      console.log('lang changed');
      console.log(this.isLoaded);
    });
    this.fetchEventTypes();
  }

  fetchEventTypes(): void {
    this.fetchCounter++;
    if (this.fetchCounter < 5) {
      this.eventsService.getEventTypes().subscribe(
        (data) => {
          console.log('data');
          console.log(this.isLoaded);
          this.eventTypes = data;
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
      this.eventsService.getEventTypes().subscribe(
        (data) => {
          console.log('data');
          console.log(this.isLoaded);
          this.eventTypes = data;
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

    if (this.isLoaded) {
      console.log('tl if');
      console.log(this.isLoaded);
      this.chartData = this.eventTypes.map(type => ({
        name: this.currentLang === 'ar' ? type.nameAr : type.nameEn,
        value: type.value,
        extra: { code: type.extra.code },
      }));
      Object.assign(this, { chartData: this.chartData });
    }
  }

  percentageFormatting(value: number): string {
    return `${value.toFixed(0)}`;
  }

}

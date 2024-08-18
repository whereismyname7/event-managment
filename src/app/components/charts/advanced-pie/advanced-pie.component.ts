import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { EventType } from '../../../models/event-type';
import { timer } from 'rxjs';
import { time } from 'console';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private translateService: TranslateService, private eventsService: EventsService, @Inject(PLATFORM_ID) private platformId: Object,) {
    this.currentLang = translateService.currentLang;

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
      this.eventsService.getEventTypes().subscribe(
        (data) => {
          this.eventTypes = data;
          this.isLoaded = true;
          this.transformDataForChart();
        },
        (error) => {
          console.log('error');
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
          this.eventTypes = data;
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

  transformDataForChart(): void {
    if (this.isLoaded) {
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

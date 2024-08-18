import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { EventCategory } from '../../../models/event-category';
import { timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';




@Component({
  selector: 'app-pie-grid',
  templateUrl: './pie-grid.component.html',
  styleUrl: './pie-grid.component.css'
})
export class PieGridComponent implements OnInit, AfterViewInit {
  eventCategories: EventCategory[] = [];
  chartData: {
    name: string;
    value: number;
  }[] = [];
  currentLang: string;
  view: [number, number] = [640, 200];


  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FA5A7D', '#4BBF65', '#FF9479', '#C48CFF']
  };
  isLoaded = false;
  fetchCounter = 0;
  fetchCounterExcceded = false;

  constructor(private translateService: TranslateService, private eventsService: EventsService, @Inject(PLATFORM_ID) private platformId: Object,) {
    this.currentLang =translateService.currentLang;
  }

  ngAfterViewInit(): void {
    console.log('b4 is');
    if (isPlatformBrowser(this.platformId)) {
      console.log('after isBrowser');
      timer(10000).subscribe(() => {
        console.log('after timer');
        if (!this.isLoaded) {
          this.fetchEventCategories2();
          console.log('after fetch');
        }
      });
    }
  }


  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.currentLang = this.translateService.currentLang;
      this.transformDataForChart();
    });
    this.fetchEventCategories();
  }
  fetchEventCategories(): void {
    this.fetchCounter++;
    if (this.fetchCounter < 5) {
      this.eventsService.getEventCategories().subscribe(
        (data) => {
          this.eventCategories = data;
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
  fetchEventCategories2(): void {
    this.fetchCounter++;
    if (this.fetchCounter < 3) {
      this.eventsService.getEventCategories().subscribe(
        (data) => {
          this.eventCategories = data;
          this.isLoaded = true;
          this.transformDataForChart();
        },
        (error) => {
          timer(10000).subscribe(() => { this.fetchEventCategories2(); });
        },
      );
    }
    else {
      timer(5000).subscribe(() => { this.fetchCounterExcceded = true; });
    }
  }

  transformDataForChart(): void {
    this.chartData = this.eventCategories.map(category => ({
      name: this.currentLang === 'ar' ? category.nameAr : category.nameEn,
      value: category.value
    }));
  }

}

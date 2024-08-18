import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { EventCategory } from '../../../models/event-category';
import { timer } from 'rxjs';




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

  constructor(private translateService: TranslateService, private eventsService: EventsService) {
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.setDefaultLang('ar');
    const browserLang = this.translateService.getBrowserLang();
    this.currentLang = browserLang && browserLang.match(/en|ar/) ? browserLang : 'ar';
    this.translateService.use(this.currentLang)
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    document.addEventListener('DOMContentLoaded', () => {
      timer(10000).subscribe(() => {
        console.log('DOMContentLoaded');
        console.log(this.isLoaded);
        if (!this.isLoaded) {
          this.fetchEventCategories2();
        }
      });
    });
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
          console.log('data');
          console.log(this.isLoaded);
          this.eventCategories = data;
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
  fetchEventCategories2(): void {
    this.fetchCounter++;
    if (this.fetchCounter < 3) {
      this.eventsService.getEventCategories().subscribe(
        (data) => {
          console.log('data');
          console.log(this.isLoaded);
          this.eventCategories = data;
          this.isLoaded = true;
          this.transformDataForChart();
        },
        (error) => {
          console.log('error');
          console.log(this.isLoaded);
          console.log(this.fetchCounter);
          // console.error('Error fetching event types:', error);
          timer(10000).subscribe(() => { this.fetchEventCategories2(); });
        },
      );
    }
    else {
      timer(5000).subscribe(() => { this.fetchCounterExcceded = true; });
    }
  }

  transformDataForChart(): void {
    console.log(this.currentLang);
    this.chartData = this.eventCategories.map(category => ({
      name: this.currentLang === 'ar' ? category.nameAr : category.nameEn,
      value: category.value
    }));
  }

}

import { Component, OnInit } from '@angular/core';
// import { eventCategories } from '../dummyData';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../events.service';



@Component({
  selector: 'app-pie-grid',
  templateUrl: './pie-grid.component.html',
  styleUrl: './pie-grid.component.css'
})
export class PieGridComponent implements OnInit {
  // eventCategories: any[] = eventCategories;
  eventCategories: any[] = [];
  chartData: any[] = [];
  currentLang: string;
  view: [number, number] = [640, 200];


  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FA5A7D', '#4BBF65', '#FF9479', '#C48CFF']
  };

  constructor(private translateService: TranslateService, private eventsService: EventsService) {
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.setDefaultLang('ar');
    const browserLang = this.translateService.getBrowserLang();
    this.currentLang = browserLang && browserLang.match(/en|ar/) ? browserLang : 'ar';
    this.translateService.use(this.currentLang)
  }
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      
      this.currentLang = this.translateService.currentLang;
      this.transformDataForChart();
      // this.translateEvents();
    });
    this.fetchEventCategories();
    
  }
  // translateEvents() {
    
  //   // this.eventCategories = eventCategories.map(event => ({
  //   //   ...event,
  //   //   name: this.translateService.instant(event.name)
  //   // }));

  //   Object.assign(this.eventCategories);
  // }

  fetchEventCategories(): void {
    this.eventsService.getEventCategories().subscribe(
      (data) => {
        this.eventCategories = data;
        this.transformDataForChart();
      },
      (error) => {
        console.error('Error fetching event categories:', error);
      }
    );
  }

  transformDataForChart(): void {
    this.chartData = this.eventCategories.map(category => ({
      name: this.currentLang === 'ar' ? category.nameAr : category.nameEn,
      value: category.value 
    }));
  }
  }

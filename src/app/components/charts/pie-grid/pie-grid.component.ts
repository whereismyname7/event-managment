import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/events.service';
import { EventCategory } from '../../../models/event-category';




@Component({
  selector: 'app-pie-grid',
  templateUrl: './pie-grid.component.html',
  styleUrl: './pie-grid.component.css'
})
export class PieGridComponent implements OnInit {
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
    });
    this.fetchEventCategories();
  }

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
    console.log(this.currentLang);
    this.chartData = this.eventCategories.map(category => ({
      name: this.currentLang === 'ar' ? category.nameAr : category.nameEn,
      value: category.value
    }));
  }
  
}

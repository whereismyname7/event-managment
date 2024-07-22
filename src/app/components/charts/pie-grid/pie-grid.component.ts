import { Component, OnInit } from '@angular/core';
import { eventCategories } from '../dummyData';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-pie-grid',
  templateUrl: './pie-grid.component.html',
  styleUrl: './pie-grid.component.css'
})
export class PieGridComponent implements OnInit {
  eventCategories: any[] = eventCategories;
  view: [number, number] = [640, 200];


  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FA5A7D', '#4BBF65', '#FF9479', '#C48CFF']
  };

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.setDefaultLang('ar');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang && browserLang.match(/en|ar/) ? browserLang : 'en');
    this.translateEvents();
    
  }
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.translateEvents();
    });
  }
  translateEvents() {
    
    this.eventCategories = eventCategories.map(event => ({
      ...event,
      name: this.translateService.instant(event.name)
    }));

    Object.assign(this.eventCategories);
  }

}

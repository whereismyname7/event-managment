import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';
import { EventsService, eventType } from '../../../events.service';

@Component({
  selector: 'app-advanced-pie',
  templateUrl: './advanced-pie.component.html',
  styleUrl: './advanced-pie.component.css'
})
export class AdvancedPieComponent implements OnInit {

  eventTypes: eventType[] = [];
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
    this.eventsService.getEventTypes().subscribe(
      (data) => {
        this.eventTypes = data;
        this.transformDataForChart();
      },
      (error) => {
        console.error('Error fetching event types:', error);
      },
    );
  }

  transformDataForChart(): void {
    this.chartData = this.eventTypes.map(type => ({
      name: this.currentLang === 'ar' ? type.nameAr : type.nameEn,
      value: type.value,
      extra: { code: type.extra.code },
    }));
    Object.assign(this, { chartData: this.chartData });
  }

  percentageFormatting(value: number): string {
    return `${value.toFixed(0)}`;
  }

}

import { Component, OnInit } from '@angular/core';
import { eventTypes } from '../dummyData';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-advanced-pie',
  templateUrl: './advanced-pie.component.html',
  styleUrl: './advanced-pie.component.css'
})
export class AdvancedPieComponent implements OnInit {

  eventTypes: any[] = eventTypes;
  view: [number, number] = [660, 180];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  label: string = '';
  animations: boolean = false;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#E9C46A', '#5FB6AB']
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

    this.eventTypes = eventTypes.map(event => ({
      ...event,
      name: this.translateService.instant(event.name)
    }));
    Object.assign(this.eventTypes);
  }

  percentageFormatting(value: number): string {
    return `${value.toFixed(0)}`;
  }

}

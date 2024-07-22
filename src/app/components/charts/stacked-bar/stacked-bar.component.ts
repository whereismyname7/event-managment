import { Component, OnInit } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { totalEvents } from '../dummyData'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrl: './stacked-bar.component.css'
})
export class StackedBarComponent implements OnInit {

  events = totalEvents;
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
    
    this.events = totalEvents.map(event => ({
      ...event,
      series: event.series.map(series => ({
        ...series,
        name: this.translateService.instant(series.name)
      }))
    }));

    Object.assign(this.events);
  }
}

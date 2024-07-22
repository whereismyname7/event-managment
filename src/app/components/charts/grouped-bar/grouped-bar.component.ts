import { Component, OnInit } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { totalAttendance } from '../dummyData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-grouped-bar',
  templateUrl: './grouped-bar.component.html',
  styleUrl: './grouped-bar.component.css'
})
export class GroupedBarComponent implements OnInit {

  attendence = totalAttendance;
  view: [number,number] = [540,350]

  // options
  legendPosition: LegendPosition = LegendPosition.Below;
  legend: boolean = true;
  legendTitle: string = ''

  xAxis: boolean = true;
  yAxis: boolean = true;

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0496ff','#fa5b7e']
  };

  yScaleMax: number = 20000;
  barPadding: number = 2;

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

    this.attendence = totalAttendance.map(event => ({
      ...event,
      series: event.series.map(series => ({
        ...series,
        name: this.translateService.instant(series.name)
      }))
    }));

    Object.assign(this.attendence);
  }

}

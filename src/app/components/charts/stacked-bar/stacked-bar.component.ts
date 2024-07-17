import { Component } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { totalEvents } from '../dummyData'; 

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrl: './stacked-bar.component.css'
})
export class StackedBarComponent {

  events = totalEvents;
  view: [number,number] = [700,370]

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
  barPadding: number = 40;


}

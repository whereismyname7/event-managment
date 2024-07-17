import { Component } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { totalAttendance } from '../dummyData'; 

@Component({
  selector: 'app-grouped-bar',
  templateUrl: './grouped-bar.component.html',
  styleUrl: './grouped-bar.component.css'
})
export class GroupedBarComponent {

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


}

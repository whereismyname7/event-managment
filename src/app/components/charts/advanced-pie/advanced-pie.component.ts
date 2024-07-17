import { Component } from '@angular/core';
import { eventTypes } from '../dummyData';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-advanced-pie',
  templateUrl: './advanced-pie.component.html',
  styleUrl: './advanced-pie.component.css'
})
export class AdvancedPieComponent {

  eventTypes: any[] = eventTypes;
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  animations: boolean = false; 

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#E9C46A', '#5FB6AB']
  };

  constructor() {
    Object.assign(this, { this: this.eventTypes });
  }

}

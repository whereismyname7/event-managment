import { Component } from '@angular/core';
import { eventCategories } from '../dummyData';
import { Color, ScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-pie-grid',
  templateUrl: './pie-grid.component.html',
  styleUrl: './pie-grid.component.css'
})
export class PieGridComponent {
  eventCategories: any[] = eventCategories;
  view: [number, number] = [700, 200];

  
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FA5A7D', '#4BBF65', '#FF9479', '#C48CFF']
  };
  
  constructor() {
    Object.assign(this, { eventCategories });
  }
}

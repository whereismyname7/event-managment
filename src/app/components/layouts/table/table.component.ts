import { Component, Input, AfterViewInit } from '@angular/core';
import { events } from './eventsDummyData';
// import 'datatables.net';
// import 'datatables.net-responsive';
 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent{
  @Input() event: any;
  events = events;
  }

import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { events } from '../eventsDummyData';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.constants';
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
  allEvents = events;


  @Output() eventsCount = new EventEmitter<number>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.emitEventsCount();
   
  }

  emitEventsCount() {
    this.eventsCount.emit(this.allEvents.length);
  }

  viewEventDetails(event: any) {
    this.router.navigate([AppRoutes.EVENT], { state: { event } });
  }

  }

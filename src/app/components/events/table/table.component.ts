import { Component, Input, Output, EventEmitter} from '@angular/core';
import { events } from '../eventsDummyData';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.constants';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent{
  @Input() event: any;
  events = events;
  pagedEvents: any[] = [];
  pageSize = 10;


  @Output() eventsCount = new EventEmitter<number>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.emitEventsCount();
    this.updatePagedEvents(0, this.pageSize);
  }

  emitEventsCount() {
    this.eventsCount.emit(this.events.length);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.updatePagedEvents(startIndex, endIndex);
  }

  updatePagedEvents(startIndex: number, endIndex: number) {
    this.pagedEvents = this.events.slice(startIndex, endIndex);
  }

  viewEventDetails(event: any) {
    this.router.navigate([AppRoutes.EVENT], { state: { event } });
  }

  }

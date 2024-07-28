import { Component, EventEmitter, Output } from '@angular/core';
import { events } from '../eventsDummyData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events-card-list',
  templateUrl: './events-card-list.component.html',
  styleUrl: './events-card-list.component.css'
})
export class EventsCardListComponent {

  allEvents = events;


  @Output() eventsCount = new EventEmitter<number>();

  ngOnInit() {
    this.emitEventsCount();
   
  }

  emitEventsCount() {
    this.eventsCount.emit(this.allEvents.length);
  }

}

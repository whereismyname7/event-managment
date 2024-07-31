import { Component, EventEmitter, Output } from '@angular/core';
import { events } from '../eventsDummyData';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.constants';


@Component({
  selector: 'app-events-card-list',
  templateUrl: './events-card-list.component.html',
  styleUrl: './events-card-list.component.css'
})
export class EventsCardListComponent {

  allEvents = events;


  constructor(private router: Router) {}

  viewEventDetails(event: any) {
    this.router.navigate([AppRoutes.EVENT], { state: { event } });
  }

}

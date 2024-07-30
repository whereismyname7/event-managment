import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.constants';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  event: any;
  eventListLink = AppRoutes.EVENTS;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.event = navigation?.extras.state?.['event'];
  }

}

import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-managment',
  templateUrl: './event-managment.component.html',
  styleUrl: './event-managment.component.css'
})
export class EventManagmentComponent {
  currentComponent: 'TableComponent' | 'EventsCardListComponent' = 'TableComponent';

  toggleComponent() {
    this.currentComponent = this.currentComponent === 'TableComponent' ? 'EventsCardListComponent' : 'TableComponent';
  }

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

   eventsCount = 0;

   onEventsCountChange(count: number) {
    this.eventsCount = count;
    this.cdr.detectChanges();
  }

  redirectToAddEvent() {
    this.router.navigate(['/add-event']);
  }
  

}

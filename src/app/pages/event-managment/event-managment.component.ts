import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.constants';

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
  successMsg:boolean = false;
  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    const navigation = this.router.getCurrentNavigation();
    this.successMsg = navigation?.extras.state?.['event'] !== undefined;
  }

   eventsCount = 0;

   onEventsCountChange(count: number) {
    this.eventsCount = count;
    this.cdr.detectChanges();
  }

  redirectToAddEvent() {
    this.router.navigate([AppRoutes.ADD_EVENT]);
  }
  

}

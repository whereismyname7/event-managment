import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'event-managment';

  //shows header and footer
  show = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if current route is the login page
        if (event.url === '/') {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    });
  }

}

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

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.setDefaultLang('ar');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang && browserLang.match(/en|ar/) ? browserLang : 'en');
    this.translateEvents();
    
  }

  translateEvents() {
    
    this.allEvents = events.map(event => ({
      ...event,
        name: this.translateService.instant(event.name)
      }));

    Object.assign(this.allEvents);
  }

  @Output() eventsCount = new EventEmitter<number>();

  ngOnInit() {
    this.emitEventsCount();
    this.translateService.onLangChange.subscribe(() => {
      this.translateEvents();
    });
  }

  emitEventsCount() {
    this.eventsCount.emit(this.allEvents.length);
  }

}

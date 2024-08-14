import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { EventCategory } from '../models/event-category';
import { EventType } from '../models/event-type';
import { EventAttendance } from '../models/event-attendance';
import { TotalEvents } from '../models/total-events';




@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private categoryUrl = 'http://localhost:3000/event-categories';
  private Url = 'http://localhost:3000';
  private typesEndpoint = 'event-types';
  private eventAttendenceEndpoint = '/event-attendance';
  private totalEventsEndpoint = '/total-events';

  constructor(private http: HttpClient) { }

  getEventCategories(): Observable<EventCategory[]> {
    return this.http.get<EventCategory[]>(this.categoryUrl);
  }
  getEventTypes(): Observable<EventType[]> {
    return this.http.get<EventType[]>(this.Url + '/' + this.typesEndpoint);
  }
  getEventAttendence(): Observable<EventAttendance[]> {
    return this.http.get<EventAttendance[]>(this.Url + this.eventAttendenceEndpoint);
  }
  getTotalEvents(): Observable<TotalEvents[]> {
    return this.http.get<TotalEvents[]>(this.Url + this.totalEventsEndpoint);
  }
}


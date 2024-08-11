import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { url } from 'inspector';

export interface EventCategory {
  nameAr: string;
  nameEn: string;
  value: number;
}
export interface eventType {
  nameAr: string;
  nameEn: string;
  value: number;
  extra: { code: string };
}

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private categoryUrl = 'http://localhost:3000/event-categories';
  private Url = 'http://localhost:3000';
  private typesEndpoint = 'event-types';
  constructor(private http: HttpClient) { }

  getEventCategories(): Observable<EventCategory[]> {
    return this.http.get<EventCategory[]>(this.categoryUrl);
  }
  getEventTypes(): Observable<eventType[]> {
    return this.http.get<eventType[]>(this.Url + '/' + this.typesEndpoint);
  }
}


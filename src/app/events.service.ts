import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

interface EventCategory {
  nameAr: string;
  nameEn: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private categoryUrl = 'http://localhost:3000/event-categories';

  constructor(private http: HttpClient) { }

  getEventCategories(): Observable<EventCategory[]> {
    return this.http.get<EventCategory[]>(this.categoryUrl);
  }
}


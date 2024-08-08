import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private categoryUrl = 'http://localhost:3000/event-categories';

  constructor(private http: HttpClient) { }

  getEventCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }
}


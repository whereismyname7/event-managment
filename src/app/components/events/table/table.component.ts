import { Component, Input, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { events } from '../eventsDummyData';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.constants';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() event: any;
  events = events;
  pagedEvents: any[] = [];
  pageSize = 10;


  @Output() eventsCount = new EventEmitter<number>();
  currentLang = this.translate.currentLang;
  constructor(private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private translate: TranslateService) { }

  ngOnInit() {
    this.emitEventsCount();
    this.updatePagedEvents(0, this.pageSize);
    this.translate.onLangChange.subscribe(() => {
    this.updatePaginatorLabels();
    });
  }

  ngAfterViewInit() {
    this.updatePaginatorLabels();
  }

  updatePaginatorLabels() {
    const currentLang = this.translate.currentLang; // Get the current language
    const element = this.elementRef.nativeElement.querySelector('.mat-mdc-paginator-page-size-label');
    
    if (element) {
      if (currentLang === 'ar') {
        this.renderer.setProperty(element, 'textContent', 'عنصر لكل صفحة');
      } else {
        this.renderer.setProperty(element, 'textContent', 'Items per page');
      }
    }
  }
  

  emitEventsCount() {
    this.eventsCount.emit(this.events.length);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.updatePagedEvents(startIndex, endIndex);
  }

  updatePagedEvents(startIndex: number, endIndex: number) {
    this.pagedEvents = this.events.slice(startIndex, endIndex);
  }

  viewEventDetails(event: any) {
    this.router.navigate([AppRoutes.EVENT], { state: { event } });
  }

}

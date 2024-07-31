import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {

  @Input() level_1: any;
  @Input() link: any;

  @Input() level_2: any;
  @Input() number: any;

}

import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  private datePipe = new DatePipe('en-US');

  override format(date: Date, displayFormat: Object): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd')!;
  }
}

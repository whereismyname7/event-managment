import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { conditionalRequiredValidator, datePatternValidator } from '../../utils/custom-validator';
import { AppRoutes } from '../../app.constants';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventListLink = AppRoutes.EVENTS;

  submitted = false;
  addEventForm: FormGroup;
  types = ['PHYSICAL', 'ONLINE'];
  selectedCategory: string = '';
  selectedTypeNum: number = -1;
  selectedType: string = '';

  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));

  isEventNameInvalid = false;
  isEventCategoriesInvalid = false;
  isEventTypeInvalid = false;
  isEventLocationInvalid = false;
  isEventLinkInvalid = false;
  isEventDateInvalid = false;
  isEventTimeInvalid = false;
  isEventCapacityInvalid = false;


  english() {
    this._locale.set('en');
    this._adapter.setLocale(this._locale());
  }
  arabic() {
    this._locale.set('ar');
    this._adapter.setLocale(this._locale());
  }

  updateCloseButtonLabel(label: string) {
    this._intl.closeCalendarLabel = label;
    this._intl.changes.next();
  }



  constructor(
    private fb: FormBuilder,
    public translateService: TranslateService,
    private datePipe: DatePipe
  ) {
    translateService.currentLang === 'ar' ? this.arabic() : this.english();

    this.addEventForm = this.fb.group({
      eventName: new FormControl('', [Validators.required]),
      eventCategories: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      eventLocation: new FormControl(''),
      eventLink: new FormControl(''),
      eventDate: new FormControl('', [
        datePatternValidator(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/), Validators.required
      ]),
      eventTime: new FormControl('', [Validators.required]),
      eventCapacity: new FormControl('', [Validators.min(5), Validators.required]),
    });

    // Handle dynamic validators
    this.addEventForm.get('eventType')?.valueChanges.subscribe(value => {
      // this.selectedTypeNum = this.types.indexOf(value);
      this.updateValidators();
    });
  }

  ngOnInit(): void {
    this.translateService.currentLang === 'ar' ? this.arabic() : this.english();
    this.translateService.onLangChange.subscribe((event) => {
      event.lang === 'ar' ? this.arabic() : this.english();
      this.updateValidators();  // Update validators when language changes
    });
  }

  private async updateValidators(): Promise<void> {
    const eventLocationControl = this.addEventForm.get('eventLocation');
    const eventLinkControl = this.addEventForm.get('eventLink');

    const translatedOnline = await this.translateService.get('ONLINE').toPromise();
    const translatedPhysical = await this.translateService.get('PHYSICAL').toPromise();

    if (eventLocationControl) {
      eventLocationControl.setValidators([
        conditionalRequiredValidator('eventType', () => {
          const eventTypeValue = this.addEventForm.get('eventType')?.value;
          return eventTypeValue === this.types[0] || eventTypeValue === translatedPhysical;
        })
      ]);
    }

    if (eventLinkControl) {
      eventLinkControl.setValidators([
        conditionalRequiredValidator('eventType', () => {
          const eventTypeValue = this.addEventForm.get('eventType')?.value;
          return eventTypeValue === this.types[1] || eventTypeValue === translatedOnline;
        }),
        Validators.pattern('https?://.+')
      ]);
    }

    // Update the validation state
    eventLocationControl?.updateValueAndValidity();
    eventLinkControl?.updateValueAndValidity();
  }

  handleCategorySelected($event: [string, number]): void {
    this.selectedCategory = $event[0];
    console.log('Option selected:', $event[0]);
  }

  handleTypeSelected($event: [string, number]): void {
    this.selectedTypeNum = $event[1];
    this.addEventForm.get('eventType')?.setValue($event[0]);
    console.log('Option selected:', this.selectedTypeNum);
  }

  onSubmit(): void {
    this.submitted = true;
    const eventDateControl = this.addEventForm.get('eventDate');
    if (eventDateControl) {
      const eventDateValue = eventDateControl.value;
      const transformedDate = this.datePipe.transform(eventDateValue, 'yyyy-MM-dd');
      eventDateControl.setValue(transformedDate);
    }
    if (this.addEventForm.valid) {
      console.log('Form Submitted!', this.addEventForm.value);
    } else {
      console.log('Form not valid');
      console.log(this.logValidationErrors());
    }
  }

  logValidationErrors(): void {
    Object.keys(this.addEventForm.controls).forEach(key => {
      const control = this.addEventForm.get(key);
      const controlErrors: ValidationErrors | null = control?.errors ?? null;
      const isInvalid = control?.invalid ?? false;

      switch (key) {
        case 'eventName':
          this.isEventNameInvalid = isInvalid;
          break;
        case 'eventCategories':
          this.isEventCategoriesInvalid = isInvalid;
          break;
        case 'eventType':
          this.isEventTypeInvalid = isInvalid;
          break;
        case 'eventLocation':
          this.isEventLocationInvalid = isInvalid;
          break;
        case 'eventLink':
          this.isEventLinkInvalid = isInvalid;
          break;
        case 'eventDate':
          this.isEventDateInvalid = isInvalid;
          break;
        case 'eventTime':
          this.isEventTimeInvalid = isInvalid;
          break;
        case 'eventCapacity':
          this.isEventCapacityInvalid = isInvalid;
          break;
      }

      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', error value: ', controlErrors[keyError]);

        });
      }
    });
    
    console.log('Form errors:');
    console.log('isEventNameInvalid =', this.isEventNameInvalid);
    console.log('isEventCategoriesInvalid =', this.isEventCategoriesInvalid);
    console.log('isEventTypeInvalid =', this.isEventTypeInvalid);
    console.log('isEventLocationInvalid =', this.isEventLocationInvalid);
    console.log('isEventLinkInvalid =', this.isEventLinkInvalid);
    console.log('isEventDateInvalid =', this.isEventDateInvalid);
    console.log('isEventTimeInvalid =', this.isEventTimeInvalid);
    console.log('isEventCapacityInvalid =', this.isEventCapacityInvalid);
  }

}

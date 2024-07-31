import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { conditionalRequiredValidator, datePatternValidator } from '../../utils/custom-validator';
import { events } from '../../components/events/eventsDummyData';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  submitted = false;
  addEventForm: FormGroup;
  types = ['PHYSICAL', 'ONLINE'];
  categories = ['ENTERTAINMENT', 'PROFESSIONAL', 'EDUCATIONAL', 'OTHER'];
  selectedCategory: string = ''
  selectedCategoryNum = -1;;
  selectedTypeNum: number = -1;
  selectedType: string = '';
  event = {
    id: -1,
    name: "",
    category: "",
    type: "",
    capacity: -1,
    date: "",
    time: ""
  };

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
    private datePipe: DatePipe,
    private router: Router
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
      eventLocationControl.clearValidators();
      eventLocationControl.setValidators([
        conditionalRequiredValidator('eventType', () => {
          const eventTypeValue = this.addEventForm.get('eventType')?.value;
          return eventTypeValue === this.types[0] || eventTypeValue === translatedPhysical;
        })
      ]);
      eventLocationControl.updateValueAndValidity();
    }

    if (eventLinkControl) {
      eventLinkControl.clearValidators();
      eventLinkControl.setValidators([
        conditionalRequiredValidator('eventType', () => {
          const eventTypeValue = this.addEventForm.get('eventType')?.value;
          return eventTypeValue === this.types[1] || eventTypeValue === translatedOnline;
        }),
        Validators.pattern('https?://.+')
      ]);
      eventLinkControl.updateValueAndValidity();
    }
  }

  handleCategorySelected($event: [string, number]): void {
    this.selectedCategoryNum = $event[1];
    this.selectedCategory = $event[0];
    console.log('Option selected:', $event[0]);
  }

  handleTypeSelected($event: [string, number]): void {
    this.selectedTypeNum = $event[1];
    this.addEventForm.get('eventType')?.setValue($event[0]);
    console.log('Option selected:', this.selectedTypeNum);
  }
  redirectToEvents() {
    this.router.navigate(['/events']);
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
      this.event.id = events.length + 1
      this.event.name = this.addEventForm.value['eventName']
      this.event.category = this.categories[this.selectedCategoryNum];
      this.event.type = this.types[this.selectedTypeNum];
      this.event.date = this.addEventForm.value['eventDate']
      this.event.time = this.addEventForm.value['eventTime']
      this.event.capacity = this.addEventForm.value['eventCapacity']
      // this.event.location; //eventLocation
      // this.event.link; //eventLink
      console.log(this.event)
      events.push(this.event)
      this.redirectToEvents()

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

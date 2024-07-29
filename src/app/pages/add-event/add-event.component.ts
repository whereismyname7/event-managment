import { Component, computed, Inject, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { eventCategories, eventTypes } from '../../components/charts/dummyData';
import { DatePipe } from '@angular/common';
import { conditionalRequiredValidator, datePatternValidator } from '../../utils/custom-validator';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  types = ['PHYSICAL', 'ONLINE'];
  selectedCategory: String = '';
  selectedType: String = '';
  selectedTypeNum = -1;
  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));

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

  submitted = false;
  addEventForm: FormGroup;

  constructor(private fb: FormBuilder, public translateService: TranslateService, private datePipe: DatePipe) {
    translateService.currentLang === 'ar' ? this.arabic() : this.english();

    this.addEventForm = this.fb.group({
      eventName: new FormControl('', [
        Validators.required
      ]),
      eventCapacity: new FormControl('', [
        Validators.min(5), Validators.required
      ]),
      eventLocation: new FormControl('', [
        conditionalRequiredValidator('eventType', (value) => value.toUpperCase() === this.types[0])
      ]),
      eventLink: new FormControl('', [

        conditionalRequiredValidator('eventType', (value) => value.toUpperCase() === this.types[1]),

        Validators.pattern('https?://.+')]),
      eventDate: new FormControl('', [
        datePatternValidator(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/), Validators.required
      ]),
      eventTime: new FormControl(''),
      eventCategories: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
    });

    this.addEventForm.get('eventType')?.valueChanges.subscribe(value => {
      this.addEventForm.get('eventLocation')?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.translateService.currentLang === 'ar' ? this.arabic() : this.english();
    this.translateService.onLangChange.subscribe((event) => {
      event.lang === 'ar' ? this.arabic() : this.english();
    });
  }

  handleCategorySelected($event: [string, number]) {
    this.selectedCategory = $event[0];
    console.log('Option selected:', $event[0]);
  }

  handleTypeSelected($event: [string, number]) {
    const currentLang = this.translateService.currentLang;
    this.selectedTypeNum = $event[1];
    this.translateService.use('en');
    this.selectedType = this.translateService.instant(this.types[$event[1]].toUpperCase()) ?? this.selectedType.toUpperCase();
    this.translateService.use(currentLang);
    console.log('Option selected:', this.selectedType.toUpperCase());
  }

  onSubmit() {
    this.submitted = true;
    const formValue = this.addEventForm;
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

  logValidationErrors(): any {
    Object.keys(this.addEventForm.controls).forEach(key => {
      const controlErrors: ValidationErrors | null = this.addEventForm.get(key)?.errors ?? null;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', error value: ', controlErrors[keyError]);
        });
      }
    });
  }
}

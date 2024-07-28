import { Component, computed, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'] 
})
export class AddEventComponent implements OnInit {

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

  constructor(private fb: FormBuilder, public translateService: TranslateService,

  ) {
    translateService.currentLang === 'ar' ? this.arabic() : this.english();

    this.addEventForm = this.fb.group({
      eventName: new FormControl('', [
        Validators.required
      ]),
      eventCapacity: new FormControl('', [
        Validators.min(5), Validators.required
      ]),
      eventLocation: new FormControl(''),
      eventLink: new FormControl('', [Validators.pattern('https?://.+'),]),
      eventDate: new FormControl('', [
        Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}'), Validators.required
      ]),
      eventTime: new FormControl('', [
        Validators.pattern('[0-9]{2}:[0-9]{2}'), Validators.required
      ]),
    });
  }
  ngOnInit(): void {
    this.translateService.currentLang === 'ar' ? this.arabic() : this.english();
    this.translateService.onLangChange.subscribe((event) => {
      event.lang === 'ar' ? this.arabic() : this.english();
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addEventForm.valid) {
      console.log('Form Submitted!', this.addEventForm.value);
    } else {
      console.log('Form not valid');
    }
  }
}

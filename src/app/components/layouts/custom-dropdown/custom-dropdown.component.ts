// custom-dropdown.component.ts
import { Component, EventEmitter, HostListener, Input, OnInit, Output, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ]
})
export class CustomDropdownComponent implements OnInit, ControlValueAccessor {
  
  @Input() options: string[] = [];
  @Input() invalid: boolean = true;
  @Output() optionSelected = new EventEmitter<[string,number]>();
  selectedValue: string = '';
  isOpen = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(event: Event, option: string, num:number) {
    event.preventDefault();
    this.selectedValue = option;
    this.onChange(option);
    this.onTouched();
    this.optionSelected.emit([option,num]);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isOpen = false;
    }
  }

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if necessary
  }
}

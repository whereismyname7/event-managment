// utils/custom-validator.ts
import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';


export function conditionalRequiredValidator(
  dependentControlName: string,
  condition: (value: any) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent as FormGroup;
    if (!formGroup) return null; // Form group not found

    const dependentControl = formGroup.get(dependentControlName);
    if (!dependentControl) return null; // Dependent control not found

    const conditionMet = condition(dependentControl.value);

    if (conditionMet && !control.value) {
      return { required: true };
    }

    return null;
  };
}

export function datePatternValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values
    }
    const isValid = pattern.test(control.value);
    return isValid ? null : { datePattern: { valid: false } };
  };
}

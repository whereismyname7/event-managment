// utils/custom-validator.ts
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function conditionalRequiredValidator(
  dependentControlName: string,
  conditionFn: (value: any) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control?.parent;
    if (!form) {
      return null;
    }

    const dependentControl = form.get(dependentControlName);
    if (dependentControl) {
      const isConditionMet = conditionFn(dependentControl.value);
      if (isConditionMet && !control.value) {
        return { required: true };
      }
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

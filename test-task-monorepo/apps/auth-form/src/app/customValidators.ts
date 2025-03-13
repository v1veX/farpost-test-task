import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function patternMismatchValidator(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const mismatch = !pattern.test(control.value);
      return mismatch ? {patternMismatch: {value: control.value}} : null;
    };
  }
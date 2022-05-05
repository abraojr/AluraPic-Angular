import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class UserNamePasswordValidatorService {

  userNamePasswordValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const userName = formGroup.get('userName').value;
      const password = formGroup.get('password').value;

      if (userName.trim() + password.trim()) {
        return userName != password ? null : { userNamePassword: true };
      } else {
        return null
      }
    }
  }
}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { PlatformDetectorService } from './../../core/platform-detector/platform-detector.service';
import { UserNamePasswordValidatorService } from './username-password.validator.service';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService, UserNamePasswordValidatorService]
})
export class SignUpComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private userNamePassword: UserNamePasswordValidatorService) { }


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    }, {
      validators: this.userNamePassword.userNamePasswordValidator()
    });
  }

  ngAfterViewInit(): void {
    this.platformDetectorService.isPlaformBrowser() &&
      this.emailInput.nativeElement.focus();
  }

  signup() {
    if (this.signupForm.valid && this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signUpService
        .signup(newUser)
        .subscribe({
          next: () => this.router.navigate(['']),
          error: (err) => console.log(err)
        });
    }
  }
}

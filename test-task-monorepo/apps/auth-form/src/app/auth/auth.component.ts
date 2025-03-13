import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { patternMismatchValidator } from '../customValidators';
import { AuthSubmissionService } from '../auth-submission.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
    minPasswordLength = 6;

    errorTexts = {
        email: 'Invalid email',
        passwordPattern: 'Password must contain lowercase letter, uppercase letter, digit and special symbol (!, @, #, $, %, ^, & or *)',
        passwordLength: `Password must have at least ${this.minPasswordLength} characters`,
        empty: 'Fill in this field',
    }

    elementStateClasses = {
        invalid: 'invalid',
    }

    authForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(this.minPasswordLength),
            patternMismatchValidator(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/),
        ]),
    });

    submissionService = inject(AuthSubmissionService);

    inputFocuses = {
        email: false,
        password: false,
    }

    errorMessages = {
        email: '',
        password: '',
    }

    isSubmissionDisabled = false;

    validateEmailField(inputElement: any) {
        const isInvalid = this.authForm.controls.email.invalid;
        const isEmpty = this.authForm.controls.email.hasError('required');

        inputElement.classList.toggle(this.elementStateClasses.invalid, isInvalid);

        this.errorMessages.email = isEmpty ? this.errorTexts.empty : isInvalid ? this.errorTexts.email : '';
    }

    validatePasswordField(inputElement: any) {
        const isInvalid = this.authForm.controls.password.invalid;
        const isEmpty = this.authForm.controls.password.hasError('required');
        const isShort = this.authForm.controls.password.hasError('minlength');
        const isMismatched = this.authForm.controls.password.hasError('patternMismatch');

        inputElement.classList.toggle(this.elementStateClasses.invalid, isInvalid);

        this.errorMessages.password = isEmpty
            ? this.errorTexts.empty
            : isShort
                ? this.errorTexts.passwordLength
                : isMismatched
                    ? this.errorTexts.passwordPattern
                    : '';
    }

    validateAllFields() {
        const emailField = document.querySelector('[formControlName="email"]');
        const passwordField = document.querySelector('[formControlName="password"]');

        this.validateEmailField(emailField);
        this.validatePasswordField(passwordField);
    }

    onEmailFocusIn() {
        this.inputFocuses.email = true;
    }

    onEmailFocusOut(event: Event) {
        this.inputFocuses.email = false;
        this.validateEmailField(event.target);
    }

    onPasswordFocusIn() {
        this.inputFocuses.password = true;
    }

    onPasswordFocusOut(event: Event) {
        this.inputFocuses.password = false;
        this.validatePasswordField(event.target);
    }

    onSubmit() {
        this.validateAllFields();

        if (!this.authForm.valid) return;

        this.isSubmissionDisabled = true;

        this.submissionService.submit(this.authForm.value.email, this.authForm.value.password)
            .finally(() => this.isSubmissionDisabled = false);
    }
}
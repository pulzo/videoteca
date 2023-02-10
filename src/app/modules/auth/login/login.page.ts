import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  serverError = 0;
  serverMessageError = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  submitForm() {
    localStorage.setItem('email', this.loginForm.get('email')?.value);
    if (!this.loginForm.valid) {
      return;
    }

    this.isSubmitting = true;
    this.authService
      .login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .pipe(
        finalize(() => (this.isSubmitting = false)),
        tap((user: any) => {
          this.clearForm();
          if (user?.error) {
            this.serverError = user.code;
            this.serverMessageError = user.error;
          }
          if (!user?.error && user?.email) {
            this.authService.user = user;
          }
        }),
        switchMap((user) => this.authService.getUser(user)),
        tap((user: any) => {
          if (user?.error) {
            return;
          }
          this.authService.user = user;
          switch (user.role) {
            case 'Admin':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'Financial':
              this.router.navigate(['/financial-dashboard']);
              break;
            case 'Reports':
              this.router.navigate(['/report-dashboard']);
              break;
            case 'Alliances':
              this.router.navigate(['/alliances-dashboard']);
              break;
            default:
              //if (user.documents.complete) {
              if (user?.accounType == '' || user.user?.account_type == '') {
                this.router.navigate(['/account-type']);
              } else if (user?.accounType == 'manual' || user.user?.account_type == 'manual') {
                this.router.navigate(['/cms-dashboard']);
              } else if (user?.accounType == 'automatic' || user.user?.account_type == 'automatic') {
                this.router.navigate(['/rss-dashboard']);
              } else if (user?.accounType == 'hybrid' || user.user?.account_type == 'hybrid') {
                this.router.navigate(['/hybrid-dashboard']);
              } else if (
                user?.accounType == 'trial' ||
                user.user?.account_type == 'trial' ||
                user?.accounType == 'robby' ||
                user.user?.account_type == 'robby'
              ) {
                this.router.navigate(['/trial-dashboard']);
              } else {
                this.router.navigate(['/login']);
              }
              break;
          }
        })
      )
      .subscribe();
  }

  public noWhitespaceValidator(control: any) {
    const hasWhitespace = (control.value || '').indexOf(' ') >= 0;
    const isValid = !hasWhitespace;
    return isValid ? null : { whitespace: true };
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', this.noWhitespaceValidator],
    });

    this.loginForm?.get('password')?.valueChanges.subscribe(() => {
      this.serverError = 0;
    });
  }

  private clearForm() {
    this.loginForm.reset();
  }
}

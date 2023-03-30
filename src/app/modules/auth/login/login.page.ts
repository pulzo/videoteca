import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { PulzoHubService } from 'src/app/core/services/pulzo-hub.service';

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
    private userService: UserService,
    private pulzoHubService: PulzoHubService
  ) { }

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

      )
      .subscribe(data => {
        switch (data.pulzohub) {
          case 'GeneralCerbero':
            this.pulzoHubService.setPulzoHub(data._id);
            this.router.navigate(['/home']);
            break;
          default:
            this.router.navigate(['/login']);
            break;
        }

      }
      );
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

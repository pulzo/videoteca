import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputEmailComponent } from './login/components/input-email/input-email.component';
import { InputPasswordComponent } from './login/components/input-password/input-password.component';
import { ButtonLoginComponent } from './login/components/button-login/button-login.component';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [LoginPage, InputEmailComponent, InputPasswordComponent, ButtonLoginComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, TranslocoModule
  ],
  exports: [LoginPage]
})
export class AuthModule { }

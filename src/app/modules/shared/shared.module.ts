import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { BackHeaderComponent } from './back-header/back-header.component';
import { HeaderComponent } from './header/header.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BackHeaderComponent,
    HeaderComponent,
    SiderbarComponent
  ],
  imports: [
    CommonModule, TranslocoModule, RouterModule
  ],
  exports: [
    TranslocoModule, RouterModule, HeaderComponent, BackHeaderComponent, SiderbarComponent
  ]
})
export class SharedModule { }

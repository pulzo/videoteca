import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BackHeaderComponent } from './back-header/back-header.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    BackHeaderComponent,
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

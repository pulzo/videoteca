import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { BackHeaderComponent } from './back-header/back-header.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SiderbarDarkComponent } from './siderbar-dark/siderbar-dark.component';
import { SiderbarLightComponent } from './siderbar-light/siderbar-light.component';

@NgModule({
  declarations: [
    BackHeaderComponent,
    HeaderComponent,
    SiderbarDarkComponent,
    SiderbarLightComponent
  ],
  imports: [
    CommonModule, TranslocoModule, RouterModule
  ],
  exports: [
    TranslocoModule, RouterModule, HeaderComponent, BackHeaderComponent, SiderbarDarkComponent, SiderbarLightComponent
  ]
})
export class SharedModule { }

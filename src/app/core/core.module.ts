import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { httpInterceptorProviders } from './interceptors';

@NgModule({
  imports: [HttpClientModule, RouterModule],
  providers: [httpInterceptorProviders],
})
export class CoreModule {}

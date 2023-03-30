import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { ButtonsIrisModule, InputIrisModule } from 'iris-front';
import { TranslocoRootModule } from './core/transloco-root.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './modules/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './core/interceptors';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { LayoutModule } from './layout/layout.module';
import { ErrorsModule } from './modules/errors/errors.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ButtonsIrisModule,
    InputIrisModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslocoRootModule,
    AppRoutingModule,
    LayoutModule,
    ErrorsModule
    
  ],
  providers: [httpInterceptorProviders, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

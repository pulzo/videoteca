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

import { environment as env } from 'src/environments/environment';
import * as Sentry from "@sentry/angular-ivy";
import { BrowserTracing } from "@sentry/tracing";
import { RewriteFrames } from '@sentry/integrations';


if (env.production || env.staging) {
  Sentry.init({
    dsn: env.sentry,
    release: env.release,
    environment: env.production ? 'prod' : 'dev',
    integrations: [
      new RewriteFrames(),
      new BrowserTracing({
        tracingOrigins: ['localhost', 'https://yourserver.io/api'],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0,
  });
}


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

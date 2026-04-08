import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { ButtonsIrisModule, InputIrisModule } from 'iris-front';
import { TranslocoRootModule } from './core/transloco-root.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './core/interceptors';
import { LayoutModule } from './layout/layout.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { DataSharingService } from './core/services/data-sharing.service';

import { environment as env } from 'src/environments/environment';
import * as Sentry from "@sentry/angular-ivy";
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './modules/shared/shared.module';
import { VideoModule } from './modules/video/video.module';

if (env.production || env.staging) {
  Sentry.init({
    dsn: env.sentry,
    release: env.release,
    environment: env.production ? 'prod' : 'dev',
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ["localhost", "https://yourserver.io/api"],
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslocoRootModule,
    AppRoutingModule,
    LayoutModule,
    ErrorsModule,
    HomeModule,
    SharedModule,
    VideoModule,
  ],
  providers: [httpInterceptorProviders, AppComponent, DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
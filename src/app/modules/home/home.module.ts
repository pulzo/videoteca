import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { BasicTableIrisModule, BuscadorModule, ButtonsIrisModule, HeaderModule, NavbarModule, PaginadorIrisModule } from 'iris-front';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule, HeaderModule, NavbarModule, BasicTableIrisModule, PaginadorIrisModule, CommonModule, BuscadorModule, ButtonsIrisModule, TranslocoModule, FormsModule, SharedModule],
})
export class HomeModule {}
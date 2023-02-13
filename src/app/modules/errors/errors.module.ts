import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InternalServerComponent } from './internal-server/internal-server.component';
import { NotFoundComponent } from './not-found/not-found.module';


@NgModule({
  declarations: [NotFoundComponent, InternalServerComponent],
  imports: [RouterModule],
})
export class ErrorsModule {}

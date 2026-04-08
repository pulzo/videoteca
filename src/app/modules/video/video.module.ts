import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [VideoComponent],
  imports: [
      CommonModule, TranslocoModule, SharedModule, FormsModule, ReactiveFormsModule
    ]
})
export class VideoModule { }

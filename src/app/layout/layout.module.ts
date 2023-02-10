import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { SharedModule } from '@app/shared/shared.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [RouterModule],
  exports: [RouterModule]
})
export class LayoutModule {}

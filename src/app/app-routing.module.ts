import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        canActivate: [AuthGuard],
        path: 'home',
        component: HomeComponent,
      },
    ],

  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',

    }),
    CommonModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

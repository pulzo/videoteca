import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './modules/auth/login/login.page';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { InternalServerComponent } from './modules/errors/internal-server/internal-server.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: '',
  component: MainLayoutComponent,
  children: [
    {
      path: 'login',
      component: LoginPage,
    },
    {
      path: 'home-dashboard',
      component: InternalServerComponent,
    },
    // {
    //   path: 'not-found',
    //   //canActivate: [AuthGuard],
    //   // component: NotFoundComponent,
    // },
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

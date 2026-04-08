import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { HomeComponent } from './modules/home/home.component';
import { VideoComponent } from './modules/video/video.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './modules/errors/not-found/not-found.module';
import { InternalServerComponent } from './modules/errors/internal-server/internal-server.component';

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
    {
      canActivate: [AuthGuard],
      path: 'make-video',
      component: VideoComponent,
    },
     /* Módulo errores */
     {
      path: 'not-found',
      component: NotFoundComponent,
    },
    {
      path: 'internal-server',
      component: InternalServerComponent,
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

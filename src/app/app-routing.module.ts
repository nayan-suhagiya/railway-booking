import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes | any = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'bookings',
    component: BookingsComponent,
  },
  ,
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

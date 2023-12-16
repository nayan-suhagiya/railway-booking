import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SearchComponent } from './pages/search/search.component';

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
  {
    path: 'search/:departureStationId/:arrivalStationId/:departureDate',
    component: SearchComponent,
  },
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

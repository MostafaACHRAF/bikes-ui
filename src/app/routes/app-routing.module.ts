import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { BikeComponent } from '../bike/bike.component';
import { BikeDetailsComponent } from '../bike-details/bike-details.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'home', component: BikeComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'details/:id', component: BikeDetailsComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: '**', redirectTo: '/home', pathMatch: 'full'},
    ])
  ],
  exports: [RouterModule,]
})
export class AppRouteModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { BikeComponent } from './bike/bike.component';
import { AdminComponent } from './admin/admin.component';
import { AppRouteModule } from './routes/app-routing.module';
import { BikeDetailsComponent } from './bike-details/bike-details.component';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    BikeComponent,
    AdminComponent,
    BikeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

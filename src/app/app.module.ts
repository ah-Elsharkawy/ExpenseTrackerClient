import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './angular-module/angular-module.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import {DataTablesModule} from 'angular-datatables'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({type: 'square-jelly-box' }),
    MaterialModule,
    DataTablesModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

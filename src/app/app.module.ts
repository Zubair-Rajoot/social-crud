import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

import { MatCardModule, MatCardSubtitle } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginatorModule } from '@angular/material/paginator';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthModule } from './main/auth/auth.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import {  MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CommonModule } from '@angular/common';
import { HomeModule } from './main/home/home.module';


import { ToastrModule } from 'ngx-toastr';








@NgModule({
  declarations: [
    AppComponent,
  
   
    
   
    
  ],
  imports: [
    BrowserModule,
    HomeModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,



    AuthModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,





     ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 4000,
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      enableHtml: true,
      tapToDismiss: false,
      newestOnTop: true,
      progressAnimation: 'decreasing'
    }),
    

  


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
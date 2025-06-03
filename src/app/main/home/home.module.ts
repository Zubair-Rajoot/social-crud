import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu'; 
import { HomeRoutingModule } from './home-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateComponent } from './create/create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    ProfileComponent,
    HomeComponent,
    CreateComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    HomeRoutingModule,
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    ProfileComponent,
    HomeComponent
  ]
})
export class HomeModule { }
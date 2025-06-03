import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/auth/login/login.component';
import { SignupComponent } from './main/auth/signup/signup.component';
import { HomeComponent } from './main/home/home/home.component';
import { ProfileComponent } from './main/home/profile/profile.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
   { path: 'signup', component: SignupComponent },
   { path: 'home', component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

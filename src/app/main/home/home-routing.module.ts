import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    { path: 'create', component: CreateComponent },
  { path: 'profile', component: ProfileComponent },
   

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

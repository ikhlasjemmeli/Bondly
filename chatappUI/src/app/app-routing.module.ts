import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'SignUp', loadChildren:()=>import('./Account/signup/signup.module').then(m=>m.SignupModule)},
  {path:'Login', loadChildren:()=>import('./Account/login/login.module').then(m=>m.LoginModule)},
  {path:'dashboard', loadChildren:()=>import('./Core/Dashbord/dashbord/dashbord.module').then(m=>m.DashbordModule)}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

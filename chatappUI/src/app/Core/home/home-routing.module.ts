import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
   
    path: 'home',
    component: HomeComponent,
    //canActivate: [GuardAdminGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../Dashbord/dashbord/dashbord.module').then(m=>m.DashbordModule),
        
      },
      {
        path: 'profile',
        loadChildren: () => import('../Profiles/profile/profile.module').then(m=>m.ProfileModule),
        
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

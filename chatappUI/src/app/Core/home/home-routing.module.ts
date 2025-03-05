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
        
      },
      {
        path: 'contacts',
        loadChildren: () => import('../Contacts/contacts/contacts.module').then(m=>m.ContactsModule),
        
      },
      {
        path: 'UserProfile/:id',
        loadChildren: () => import('../Contacts/user-profile/user-profile.module').then(m=>m.UserProfileModule),
        
      },
      {
        path: 'Sent invitations',
        loadChildren: () => import('../Contacts/sent/sent.module').then(m=>m.SentModule),
        
      },
      {
        path: 'Received invitations',
        loadChildren: () => import('../Contacts/received/received.module').then(m=>m.ReceivedModule),
        
      }
      , {
        path: 'Blocked users',
        loadChildren: () => import('../Contacts/blocked/blocked.module').then(m=>m.BlockedModule),
        
      }
      , {
        path: 'Chats',
        loadChildren: () => import('../ChatArea/area/area.module').then(m=>m.AreaModule),
        
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

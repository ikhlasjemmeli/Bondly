import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';
import { AboutComponent } from '../about/about.component';
import { AboutModule } from '../about/about.module';

import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    ProfileComponent,
 
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatIconModule,
    MatButtonModule,
    SharedmoduleModule,
    MatMenuModule
    
  ]
})
export class ProfileModule { }

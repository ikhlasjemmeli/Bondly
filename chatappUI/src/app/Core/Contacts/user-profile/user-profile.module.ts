import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
       MatIconModule,
        MatButtonModule,
        SharedmoduleModule,
        MatMenuModule,
        MatButtonModule, 
        MatBottomSheetModule
  ]
})
export class UserProfileModule { }

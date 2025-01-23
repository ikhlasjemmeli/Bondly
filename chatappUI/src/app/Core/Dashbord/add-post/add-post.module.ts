import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPostRoutingModule } from './add-post-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    MatDividerModule,
    SharedmoduleModule,
    MatIconModule
  ]
})
export class AddPostModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockedRoutingModule } from './blocked-routing.module';
import { BlockedComponent } from './blocked.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    BlockedComponent
  ],
  imports: [
    CommonModule,
    BlockedRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class BlockedModule { }

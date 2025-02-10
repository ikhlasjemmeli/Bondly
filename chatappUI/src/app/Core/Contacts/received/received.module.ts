import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivedRoutingModule } from './received-routing.module';
import { ReceivedComponent } from './received.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ReceivedComponent
  ],
  imports: [
    CommonModule,
    ReceivedRoutingModule,
    MatButtonModule,
    MatDividerModule, 
    MatIconModule
  ]
})
export class ReceivedModule { }

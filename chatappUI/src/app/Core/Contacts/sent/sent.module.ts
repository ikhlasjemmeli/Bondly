import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentRoutingModule } from './sent-routing.module';
import { SentComponent } from './sent.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SentComponent
  ],
  imports: [
    CommonModule,
    SentRoutingModule,
    MatButtonModule,
    MatDividerModule, 
    MatIconModule
  ]
})
export class SentModule { }

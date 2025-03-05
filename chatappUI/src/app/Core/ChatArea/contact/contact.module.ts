import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
   // ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedmoduleModule,
    MatDividerModule
  ]
})
export class ContactModule { }

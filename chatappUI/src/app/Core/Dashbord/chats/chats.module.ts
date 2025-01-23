import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    SharedmoduleModule
  ]
})
export class ChatsModule { }

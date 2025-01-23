import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedmoduleModule
  ]
})
export class PostsModule { }

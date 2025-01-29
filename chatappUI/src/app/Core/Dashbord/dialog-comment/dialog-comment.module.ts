import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogCommentRoutingModule } from './dialog-comment-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogCommentRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DialogCommentModule { }

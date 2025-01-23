import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordDialogRoutingModule } from './forget-password-dialog-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ForgetPasswordDialogRoutingModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule
   

  ]
})
export class ForgetPasswordDialogModule { }

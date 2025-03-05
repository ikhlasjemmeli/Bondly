import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AreaComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    MatIconModule,
    MatButtonModule,
    SharedmoduleModule,
    MatDividerModule,
    MatCardModule, 
    MatButtonModule,
    PickerModule,
    MatFormFieldModule, 
    MatInputModule,
    FormsModule, 
   
  ]
})
export class AreaModule { }

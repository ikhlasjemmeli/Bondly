import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StatisticsModule } from '../statistics/statistics.module';
import { StatisticsComponent } from '../statistics/statistics.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';

@NgModule({
  declarations: [
    DashbordComponent,
   
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    MatIconModule,
    MatButtonModule,
    SharedmoduleModule,
  
  
 
    
  ]
})
export class DashbordModule { }

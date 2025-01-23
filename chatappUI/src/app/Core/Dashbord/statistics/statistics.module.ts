import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
  // StatisticsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedmoduleModule,
  
  ],
 
})
export class StatisticsModule { }

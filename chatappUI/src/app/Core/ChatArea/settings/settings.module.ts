import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';


@NgModule({
  declarations: [
   // SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedmoduleModule
  ]
})
export class SettingsModule { }

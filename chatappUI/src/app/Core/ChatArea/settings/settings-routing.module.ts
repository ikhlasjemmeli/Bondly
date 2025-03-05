import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsModule } from './settings.module';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {path:'',component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

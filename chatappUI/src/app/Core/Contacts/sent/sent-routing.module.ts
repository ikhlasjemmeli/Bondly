import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentComponent } from './sent.component';

const routes: Routes = [
  {
    path:'',component:SentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SentRoutingModule { }

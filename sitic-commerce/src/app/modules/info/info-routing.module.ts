import { NgModule } from '@angular/core';
import { InfoComponent } from './info.component';
import { RouterModule, Routes } from '@angular/router';




const routes : Routes = [
  {
    path:'',
    component:InfoComponent,
    children:[]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class InfoRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarItemComponent } from './side-bar-item.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SideBarItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    SideBarItemComponent
  ]
})
export class SideBarItemModule { }

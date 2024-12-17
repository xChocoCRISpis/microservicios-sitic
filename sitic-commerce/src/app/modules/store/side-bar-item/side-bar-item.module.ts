import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarItemComponent } from './side-bar-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    SideBarItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    SideBarItemComponent
  ]
})
export class SideBarItemModule { }

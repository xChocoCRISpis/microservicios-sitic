import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarCartComponent } from './side-bar-cart.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SideBarItemModule } from '../side-bar-item/side-bar-item.module';



@NgModule({
  declarations: [
    SideBarCartComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,

    SideBarItemModule

  ],
  exports:[
    SideBarCartComponent
  ]
})
export class SideBarCartModule { }

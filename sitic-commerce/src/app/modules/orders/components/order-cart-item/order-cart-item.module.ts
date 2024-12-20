import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCartItemComponent } from './order-cart-item.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    OrderCartItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    OrderCartItemComponent
  ]
})
export class OrderCartItemModule { }

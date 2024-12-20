import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from './order-card.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderCartItemModule } from '../order-cart-item/order-cart-item.module';



@NgModule({
  declarations: [
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,

    OrderCartItemModule
  ],
  exports:[
    OrderCardComponent
  ]
})
export class OrderCardModule { }

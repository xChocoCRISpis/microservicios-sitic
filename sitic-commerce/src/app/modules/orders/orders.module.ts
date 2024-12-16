import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { OrderCardModule } from './components/order-card/order-card.module';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,

    MatIconModule,
    MatDividerModule,

    OrderCardModule
  ],
  exports:[
    OrdersComponent
  ]
})
export class OrdersModule { }

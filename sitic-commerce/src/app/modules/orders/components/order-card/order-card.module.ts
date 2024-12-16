import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from './order-card.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    OrderCardComponent
  ]
})
export class OrderCardModule { }

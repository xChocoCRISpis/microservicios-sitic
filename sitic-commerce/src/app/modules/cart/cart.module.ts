import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartItemSummarizeModule } from './cart-item-summarize/cart-item-summarize.module';
import {  MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    CartItemSummarizeModule,


    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,


    CartItemModule
  ],
  exports:[
    CartComponent
  ]
})
export class CartModule { }

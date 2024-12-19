import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemSummarizeComponent } from './cart-item-summarize.component';



@NgModule({
  declarations: [
    CartItemSummarizeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CartItemSummarizeComponent
  ]
})
export class CartItemSummarizeModule { }

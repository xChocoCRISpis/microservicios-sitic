import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStatusClassPipe } from './product-status-class.pipe';



@NgModule({
  declarations: [ProductStatusClassPipe],
  imports: [
    CommonModule
  ],
  exports:[ProductStatusClassPipe]
})
export class ProductSatusClassModule { }

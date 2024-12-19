import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductSatusClassModule } from 'src/app/shared/pipes/product-satus-class/product-satus-class.module';



@NgModule({
  declarations: [
    CartItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    //pipe
    ProductSatusClassModule
  ],
  exports:[
    CartItemComponent
  ]
})
export class CartItemModule { }

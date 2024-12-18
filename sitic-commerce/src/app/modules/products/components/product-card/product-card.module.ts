import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProductSatusClassModule } from 'src/app/shared/pipes/product-satus-class/product-satus-class.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,

    //pipes
    ProductSatusClassModule
  ],
  exports: [ProductCardComponent]
})
export class ProductCardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { ProductCardModule } from '../products/components/product-card/product-card.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ProductSatusClassModule } from 'src/app/shared/pipes/product-satus-class/product-satus-class.module';



@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MatProgressBarModule,
    MatIconModule,

    ProductCardModule,

    //pipes
    ProductSatusClassModule
  ]
})
export class StoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProductDialogModule } from './components/product-dialog/product-dialog.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChoiceDialogComponent } from './components/choice-dialog/choice-dialog.component';
import { ChoiceDialogModule } from './components/choice-dialog/choice-dialog.module';
import { CartService } from 'src/app/shared/services/carts/cart.service';
import { CartItemService } from 'src/app/shared/services/carts/cart-item.service';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,

    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,

    // CUSTOM
    ProductDialogModule,
    ChoiceDialogModule
  ],
})
export class ProductsModule { }

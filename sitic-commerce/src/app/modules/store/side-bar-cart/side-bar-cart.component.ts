import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CartItem } from 'src/app/shared/interfaces/carts/cart-item/cart-item.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { cartItems, products } from '../side-bar-item/data-dummie';
import { OutgoingMessage } from 'http';

@Component({
  selector: 'side-bar-cart',
  templateUrl: './side-bar-cart.component.html',
  styleUrls: ['./side-bar-cart.component.scss']
})
export class SideBarCartComponent {
  cartItems:CartItem[] = cartItems;
  products:Product[] = products;
  

  @Output() isLoad: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  emitStateLoad(state:boolean){
    setTimeout(() => {
      this.isLoad.emit(state); // Emite false para ocultar el spinner
    }, 2000);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/interfaces/carts/cart-item/cart-item.interface';
import { CartWithItems } from 'src/app/shared/interfaces/carts/cart/cart-with-items.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'cart-item-summarize',
  templateUrl: './cart-item-summarize.component.html',
  styleUrls: ['./cart-item-summarize.component.scss']
})
export class CartItemSummarizeComponent implements OnInit {

  @Input() product:Product;
  @Input() cartItem:CartItem;

  constructor() { }

  ngOnInit(): void {
  }

}

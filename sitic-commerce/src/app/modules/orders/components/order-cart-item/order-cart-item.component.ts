import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/shared/interfaces/orders/order-items/order-item.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'order-cart-item',
  templateUrl: './order-cart-item.component.html',
  styleUrls: ['./order-cart-item.component.scss']
})
export class OrderCartItemComponent implements OnInit {
  @Input() orderItem: OrderItem;
  @Input() product:Product;
  

  imageErrorLoad:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

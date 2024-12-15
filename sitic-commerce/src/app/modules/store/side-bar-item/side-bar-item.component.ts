import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/interfaces/carts/cart-item/cart-item.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import {products} from './data-dummie'

@Component({
  selector: 'side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss']
})
export class SideBarItemComponent implements OnInit {

  products:Product[] = products;
  @Input() cartItem:CartItem;
  product:Product;
  error:boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log("cartItem: ",this.cartItem)
    this.getProduct(this.cartItem.product_Id);
  }

  getProduct(itemId:number){
    this.product= this.products.find(product=>product.id=itemId);
  }

}

import { Component, Inject, Input, OnInit } from '@angular/core';

// Interfaces
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ProductStatusClassPipe } from 'src/app/shared/pipes/product-satus-class/product-status-class.pipe'
import { StringifyOptions } from 'querystring';
import { MessengerService } from 'src/app/shared/services/messenger.service';
import { privateEncrypt } from 'crypto';
import { CartItemService } from 'src/app/shared/services/carts/cart-item.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  private serviceProducts = Inject(ProductsService);
  imgError:boolean = false;
  currentDate : Date|string = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() ;

  @Input() product: Product = {
    id:1,
    name:"Mouse Inalámbrico Logitech",
    description:"Mouse ergonómico con conectividad inalámbrica y batería de larga duración",
    price:25.99,
    currentStock:10,
    maxStock:100,
    minStock:10,
    stockStatusId:3,
    imagePath:null,
    createdAt: new Date()
  }

  constructor(
    private readonly messengerService:MessengerService,
    private readonly cartItemService:CartItemService
    
  ) { }

  ngOnInit(): void {
  }

  errorHandlerImg(){
    this.imgError= true;
  }

  addItem(){
    /* this.cartItemService.addItemToCart(0,) */
  }

}

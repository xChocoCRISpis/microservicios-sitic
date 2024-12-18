import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartWithItems } from '../interfaces/carts/cart/cart-with-items.interface';
import { CartService } from './carts/cart.service';
import { CartItemService } from './carts/cart-item.service';
import { Cart } from '../interfaces/carts/cart/cart.interface';
import { CartItem } from '../interfaces/carts/cart-item/cart-item.interface';


@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private cart: BehaviorSubject<CartWithItems> = new BehaviorSubject<CartWithItems>(null); 
  private cartWithoutItems: Cart;
  private cartItems:CartItem[];

  private readonly CART_KEY = 'cart';

  constructor(
    private readonly cartService:CartService,
    private readonly cartItemService:CartItemService
  ) { }

  get cart$(): Observable<CartWithItems> {
    return this.cart.asObservable();
  }

  emitCart() {
    this.setCartItems().then();
    /* const cartData = JSON.parse(localStorage.getItem('cart')) as CartWithItems; */
    /* this.cart.next(cartData); */
  }

  private async getCart(){
    const allCarts = await this.cartService.getAll();

    if(allCarts.carts.length <= 0) return; 

    this.cartWithoutItems = allCarts.carts[0];

    const cartItems = await this.cartService.getItems(this.cartWithoutItems.id);

    this.cartItems = cartItems.cartItems;
  }

  async setCartItems(){
    await this.getCart();
    const cartWithItems: CartWithItems = {data:this.cartWithoutItems, items:this.cartItems};
    const cartJson:string = JSON.stringify({cart:{data: cartWithItems.data, items:cartWithItems.items}}); 

    localStorage.setItem(this.CART_KEY,cartJson);


    this.cart.next(cartWithItems);
  }

  deleteCartOnLocalStorage(){
    localStorage.removeItem(this.CART_KEY);
    this.cart.next(null);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/interfaces/carts/cart-item/cart-item.interface';
import { CartItemUpdate } from 'src/app/shared/interfaces/carts/cart-item/requests/cart-item-insert.interface';
import { CartItemResponse } from 'src/app/shared/interfaces/carts/cart-item/responses/cart-item-response.interface';
import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { CartItemService } from 'src/app/shared/services/carts/cart-item.service';
import { MessengerService } from 'src/app/shared/services/messenger.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  errorLoadImage:boolean = false;

  @Input() cartItem:CartItem;
  @Input() product:Product;

  lowStock: boolean = false;
  isLoading:boolean = false;


  constructor(
    private readonly messengerService:MessengerService,
    private readonly cartItemService:CartItemService,
    private readonly productService:ProductsService
  ) { }

  ngOnInit(): void {
  }


  async decrementItem(): Promise<boolean> {
    const product: Product = await this.getProduct(this.cartItem.product_Id);
    if (product.currentStock < this.cartItem.quantity -1) {
      console.log("Falta stock");
      this.setLowStock(true);
      return false;
    }
    const quantity = this.cartItem.quantity - 1;

    if (quantity <= 0) {
      const deleteCartItem = await this.deleteCartItem(this.cartItem.id);
      this.messengerService.emitCart();
    } else {
      const updateCartItem: boolean = await this.updateCartItem({
        id: this.cartItem.id,
        quantity
      });

      if (!updateCartItem) return false;
    }
    this.cartItem.quantity = quantity;
    this.cartItem.price = (this.cartItem.price/(quantity +1))*quantity;
    this.messengerService.emitCart();
    return true;
  }

  async incrementItem():Promise<boolean> {
    const product: Product = await this.getProduct(this.cartItem.product_Id);
    if (product.currentStock <= this.cartItem.quantity) {
      console.log("Falta stock");
      this.setLowStock(true);
      return false;
    }
    const quantity = this.cartItem.quantity + 1;

    const updateCartItem: boolean = await this.updateCartItem({
      id: this.cartItem.id,
      quantity
    });

    if (!updateCartItem) return false;

    this.cartItem.quantity = quantity;
    this.cartItem.price = (this.cartItem.price/(quantity -1))*quantity;
    this.messengerService.emitCart();

    return true;
  }

  async deleteProduct(){
    await this.cartItemService.delete(this.cartItem.id);
    this.messengerService.emitCart();
  }

  async setProduct(itemId: number) {
    this.product = await this.getProduct(itemId);
    this.messengerService.emitCart();
  }

  async getProduct(itemId: number): Promise<Product> {
    try {
      this.isLoading = true;

      const product: ProductsResponse = await this.productService.getById(itemId);
      if (product.error && product.error.errorType === eErrorType.None) {
        console.error(`Error: ${product.error.errorType}, ${product.error.message}`);
        return product.product;
      }

      this.isLoading =false;
      return product.product;
    } catch (error) {
      console.error(error);
      this.isLoading =false;
    }
  }

  async updateCartItem(cartItemUp: CartItemUpdate): Promise<boolean> {
    try {
      this.isLoading =true;

      const res: CartItemResponse = await this.cartItemService.updateQuantity(cartItemUp);
      console.log(res);
      if (res.error && res.error.errorType === eErrorType.None) {
        console.error(`Error: ${eErrorType.None}, ${res.error.message}`);
        this.isLoading =false;
        return false;
      }
      //Significa que no hay stock suficiente
      if (res.isSuccess && res.error) {
        console.error(`No hay stock suficiente`);
        this.isLoading =false;
        return false;
      }
      this.isLoading =false;
      return true;
    } catch (e) {
      console.error(e);
      this.isLoading =false;

    }
  }

  async deleteCartItem(id: number) {
    try {
      this.isLoading =true;

      const res: CartItemResponse = await this.cartItemService.delete(id);

      if (res.error && res.error.errorType === eErrorType.None) {
        console.error(`Error: ${eErrorType.None}, ${res.error.message}`);
        this.isLoading =false;
        return;
      }

      if (res.isSuccess) {
        this.isLoading =false;
        return false;
      }
    } catch (e) {
      console.error(e);
      this.isLoading =false;

    }
  }


  setLowStock(state:boolean){
    this.lowStock=state;
    setTimeout(()=>{
      this.lowStock = !state;
    }, 1000 * 600);
  }
}

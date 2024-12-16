import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CartItem } from "src/app/shared/interfaces/carts/cart-item/cart-item.interface";
import { Product } from "src/app/shared/interfaces/products/product.interface";
/* import { cartItems, products } from "../side-bar-item/data-dummie"; */
import { CartWithItems } from "src/app/shared/interfaces/carts/cart/cart-with-items.interface";
import { ProductsService } from "src/app/shared/services/products.service";
import { ProductsResponse } from "src/app/shared/interfaces/products/products-response.interface";
import { eErrorType } from "src/app/shared/interfaces/comun/enums.interface";

@Component({
  selector: "side-bar-cart",
  templateUrl: "./side-bar-cart.component.html",
  styleUrls: ["./side-bar-cart.component.scss"],
})
export class SideBarCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  products: Product[] = [];

  @Output() isLoad: EventEmitter<boolean> = new EventEmitter<boolean>();

  

  constructor(private readonly productService: ProductsService) {
/*     console.log("cartItem",this.cartItems);
    console.log("cart",this.products); */
  }

  async ngOnInit() {
    this.setCartItems();
  }


  emitStateLoad(state: boolean) {
    setTimeout(() => {
      this.isLoad.emit(state); // Emite false para ocultar el spinner
    }, 2000);
  }

  getCartItems():CartWithItems {
    const cart: CartWithItems = (JSON.parse(localStorage.getItem("cart"))).cart;
    return cart; 
  }

  setCartItems(){
    this.cartItems = this.getCartItems().items
  }

  async getProductById(id: number) {
    this.productService
      .getById(id)
      .then((res: ProductsResponse) => {
        if (res.error && res.error.errorType === eErrorType.None) {
          console.error(`Error: ${res.error.errorType}, ${res.error.message}`);
          return;
        }

        this.products.push(res.product);
      })
      .catch(error => {
        console.error("Error al obtener los productos: ",error);
      });
  }


  calculatePrice():number{
    return this.getCartItems().items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}

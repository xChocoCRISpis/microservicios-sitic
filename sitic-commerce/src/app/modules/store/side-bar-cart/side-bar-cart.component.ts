import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { CartItem } from "src/app/shared/interfaces/carts/cart-item/cart-item.interface";
import { Product } from "src/app/shared/interfaces/products/product.interface";
/* import { cartItems, products } from "../side-bar-item/data-dummie"; */
import { CartWithItems } from "src/app/shared/interfaces/carts/cart/cart-with-items.interface";
import { ProductsService } from "src/app/shared/services/products.service";
import { ProductsResponse } from "src/app/shared/interfaces/products/products-response.interface";
import { eErrorType, eRoutes } from "src/app/shared/interfaces/comun/enums.interface";
import { MessengerService } from "src/app/shared/services/messenger.service";
import { Router } from "@angular/router";

@Component({
  selector: "side-bar-cart",
  templateUrl: "./side-bar-cart.component.html",
  styleUrls: ["./side-bar-cart.component.scss"],
})
export class SideBarCartComponent implements OnInit, AfterViewInit {
  cartItems: CartItem[] = [];
  totalPrice:number;

  products: Product[] = [];

  @Output() isLoad: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();

  refreshState: boolean;

  hasLoaded: boolean = false;


  

  constructor(
    private readonly productService: ProductsService, 
    private readonly messengerService:MessengerService,
    private readonly router:Router
  ) {
    /*     console.log("cartItem",this.cartItems);
    console.log("cart",this.products); */
  }

  ngOnInit() {
    this.messengerService.cart$.subscribe((cart:CartWithItems)=>{
      this.cartItems = cart?.items;
      this.totalPrice = this.calculatePrice();
    });

  }

  ngAfterViewInit(): void {
    this.setLoaded();
  }

  onItemRefresh(event: boolean) {
    if (event) {
      this.refresh.emit(true);
    }
  }

  emitStateLoad(state: boolean) {
    setTimeout(() => {
      this.isLoad.emit(state);
      console.log("se emitio un load: ", state);
    }, 2000);
  }

  setLoaded() {
    if (!this.hasLoaded) {
      this.hasLoaded = true;
      setTimeout(() => {
        this.isLoad.emit(true);
        console.log("se emitio un load: ", true);
      }, 2000);
    }
  }

  getCartItems(): CartWithItems {
    const cart: CartWithItems = JSON.parse(localStorage.getItem("cart")).cart;
    console.log("cart obtenido del localStorage: ", cart);
    return cart;
  }

  setCartItems() {
    this.cartItems = this.getCartItems().items;
    this.emitStateLoad(true);
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
        console.error("Error al obtener los productos: ", error);
      });
  }

  calculatePrice(): number {
    if (this.haveItems())
      return this.cartItems.reduce((total, item) => {
        return total + item.price;
      }, 0);
    else return 0;
  }

  haveItems(): boolean {
    return this.getCartItems().items ? true : false;
  }

}

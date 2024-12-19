import { Component, Inject, OnInit, OnDestroy, OnChanges } from "@angular/core";
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from "@angular/material/icon";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { CartService } from "../app/shared/services/carts/cart.service";
import { CartItemService } from "./shared/services/carts/cart-item.service";
import { eErrorType } from "./shared/interfaces/comun/enums.interface";
import { CartResponse } from "./shared/interfaces/carts/cart/responses/cart-response.interface";
import { CartItemResponse } from "./shared/interfaces/carts/cart-item/responses/cart-item-response.interface";
import { Cart } from "./shared/interfaces/carts/cart/cart.interface";
import { CartItem } from "./shared/interfaces/carts/cart-item/cart-item.interface";
import { CartWithItems } from "./shared/interfaces/carts/cart/cart-with-items.interface";
import { MatSidenav } from "@angular/material/sidenav";
import { MessengerService } from "./shared/services/messenger.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  //Forma de inyectar no directamente en el contructor (Me gusta cuando hay que innyectar muchos services)

  productInCart: number = 0;
  cartList: Cart[] = [];
  cart: CartWithItems;

  cartbar!: MatSidenav;

  onLoadCartBar: boolean = false;

  clientName = "SITICommerce";
  routes = [
    {
      path: "/store",
      icon: "mat:home",
      title: "Tienda",
    },
    {
      path: "/products",
      icon: "mat:shopping_bag",
      title: "Productos",
    },
    {
      path: "/orders",
      icon: "mat:shopping_bag",
      title: "Mis compras",
    },
    {
      path: "/about",
      icon: "mat:info",
      title: "Acerca de",
    },
  ];

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly cartService: CartService,
    private readonly cartItemService: CartItemService,
    private readonly messengerService: MessengerService
  ) {
    this.matIconRegistry.addSvgIconResolver(
      (name: string, namespace: string): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
        switch (namespace) {
          case "mat":
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/material-design-icons/two-tone/${name}.svg`
            );
        }
      }
    );
  }

  async ngOnInit() {
    this.messengerService.setCartItems();
    this.messengerService.cart$.subscribe((cart: CartWithItems) => {
      this.cart = cart;
        this.productInCart = cart?.items?.length;
    });
  }

  ngOnDestroy(): void {
    this.messengerService.deleteCartOnLocalStorage();
  }

  async setCartItems() {
    await this.getCarts();

    const cart: CartWithItems = {
      data: this.cartList[0],
      items: await this.getCartItems(this.cartList[0].id),
    };

    localStorage.setItem("cart", JSON.stringify({ cart }));
    this.productInCart = (JSON.parse(localStorage.getItem("cart")).cart as CartWithItems).items.length;
  }

  onRefresh() {
    this.setCartItems()
      .then(() => {
        console.log("Carrito actualizado de forma síncrona");
      })
      .catch(error => {
        console.error("Error en onRefresh:", error);
      });
  }

  async getCarts() {
    try {
      const carts: CartResponse = await this.cartService.getAll();
      if (carts.error && carts.error.errorType !== eErrorType.None) {
        console.error(carts.error);
        return;
      }

      if (carts.carts.length > 0) {
        this.cartList = carts.carts;
      } else {
        console.error("No se encontraron carritos disponibles.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCartItems(id: number): Promise<CartItem[]> {
    try {
      const res: CartItemResponse = await this.cartService.getItems(id);

      if (res.error && res.error.errorType !== eErrorType.None) {
        console.error(res.error);
        return [];
      }

      return res.cartItems;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

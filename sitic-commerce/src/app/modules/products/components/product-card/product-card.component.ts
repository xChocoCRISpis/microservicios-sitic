import { Component, Inject, Input, OnInit } from "@angular/core";

// Interfaces
import { Product } from "src/app/shared/interfaces/products/product.interface";
import { ProductsService } from "src/app/shared/services/products.service";
import { ProductStatusClassPipe } from "src/app/shared/pipes/product-satus-class/product-status-class.pipe";
import { StringifyOptions } from "querystring";
import { MessengerService } from "src/app/shared/services/messenger.service";
import { privateEncrypt } from "crypto";
import { CartItemService } from "src/app/shared/services/carts/cart-item.service";
import { CartService } from "src/app/shared/services/carts/cart.service";
import { CartItemInsert } from "src/app/shared/interfaces/carts/cart-item/requests/cart-item-update.interface";
import { CartWithItems } from "src/app/shared/interfaces/carts/cart/cart-with-items.interface";
import { cartItems } from "src/app/modules/store/side-bar-item/data-dummie";
import { eErrorType } from "src/app/shared/interfaces/comun/enums.interface";
import { ProductsResponse } from "src/app/shared/interfaces/products/products-response.interface";
import { CartItemResponse } from "src/app/shared/interfaces/carts/cart-item/responses/cart-item-response.interface";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  imgError: boolean = false;
  currentDate: Date | string = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString();
  isLoad: boolean = true;
  lowStock: boolean = false;
  existsInCart: boolean = false;

  @Input() product: Product = {
    id: 1,
    name: "Mouse Inalámbrico Logitech",
    description: "Mouse ergonómico con conectividad inalámbrica y batería de larga duración",
    price: 25.99,
    currentStock: 10,
    maxStock: 100,
    minStock: 10,
    stockStatusId: 3,
    imagePath: null,
    createdAt: new Date(),
  };

  constructor(
    private readonly messengerService: MessengerService,
    private readonly cartItemService: CartItemService,
    private readonly serviceProducts: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoad = false;
    if (this.product.currentStock < 1) this.lowStock = true;
  }

  errorHandlerImg() {
    this.imgError = true;
  }

  async addItem() {
    this.isLoad = true;
    const product = await this.getProduct(this.product.id);

    if (product && product.currentStock < 1) {
      this.product.currentStock = product?.currentStock;
      this.lowStock = true;
      return;
    }

    // Inicializa `cartItemInsert` con valores predeterminados
    let cartItemInsert: CartItemInsert = {
      id: 0,
      cart_Id: 0,
      product_Id: this.product.id,
      quantity: 1,
    };

    const cart: CartWithItems = this.messengerService.getCartFromLocalStorage();
    const itemExists = cart?.items?.find(item => item.product_Id === this.product.id);

    if (itemExists) {
      if (product.currentStock >= itemExists.quantity + 1) {
        await this.updateItemQuantity(itemExists.id, itemExists.quantity + 1);
        this.messengerService.emitCart();
      } else this.lowStock = true;
      this.isLoad = false;
      return;
    }

    if (cart && cart.data) {
      cartItemInsert.cart_Id = cart.data.id;
    }

    await this.insertItem(cartItemInsert);
    this.messengerService.emitCart();
    this.isLoad = false;
  }

  async insertItem(cartItem: CartItemInsert) {
    try {
      const response = await this.cartItemService.addItemToCart(cartItem);

      if (response.error && response.error.errorType !== eErrorType.None) {
        console.error(response.error);

        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const resp: ProductsResponse = await this.serviceProducts.getById(id);
      const { product } = resp;

      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return product;
      }

      return product;
    } catch (e) {
      console.error(e);
    }
  }

  async updateItemQuantity(id: number, quantity: number) {
    try {
      const resp: CartItemResponse = await this.cartItemService.updateQuantity({ id, quantity });
      console.log(resp);
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  setExists() {
    this.existsInCart = true;
    setInterval(() => {
      this.existsInCart = false;
    }, 5000);
  }
}

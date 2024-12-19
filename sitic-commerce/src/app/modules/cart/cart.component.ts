import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CartItem } from "src/app/shared/interfaces/carts/cart-item/cart-item.interface";
import { CartWithItems } from "src/app/shared/interfaces/carts/cart/cart-with-items.interface";
import { eErrorType } from "src/app/shared/interfaces/comun/enums.interface";
import { Order } from "src/app/shared/interfaces/orders/order/order.interface";
import { OrderResponse } from "src/app/shared/interfaces/orders/order/responses/order-response.interface";
import { Product } from "src/app/shared/interfaces/products/product.interface";
import { ProductsResponse } from "src/app/shared/interfaces/products/products-response.interface";
import { MessengerService } from "src/app/shared/services/messenger.service";
import { OrderService } from "src/app/shared/services/orders/order.service";
import { ProductsService } from "src/app/shared/services/products.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  cart: CartWithItems;
  emptyCart: boolean = false;
  quantityProducts: number = 0;
  total: number = 0;
  products: Product[] = [];

  constructor(
    private readonly messengerService: MessengerService,
    private readonly productsService: ProductsService,
    private readonly orderService: OrderService
  ) {}

  ngOnInit(){
    this.loadCart();
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }

  private loadCart() {
    this.isLoading = true;

    this.messengerService.cart$.subscribe(async (cart: CartWithItems) => {
      if (!cart || cart.items.length === 0) {
        this.emptyCart = true;
        return;
      }

      this.cart = cart;

      //Obtengo un arreglo de promises    
      const productPromises = cart.items.map((item) =>
        this.getProductById(item.product_Id)
      );

      // Promise all ejecuta un arreglo de promesas y retorna el arreglo si no hay un reject
      this.products = (await Promise.all(productPromises)).filter(
        //Filtro las promseas resueltas para devolver solo los que no esten vacios
        (product) => product !== null
      );

      this.setQuantityOfProducts();
      this.setTotal();

      this.emptyCart = this.products.length === 0;
      this.isLoading = false;
    });
  }


  setQuantityOfProducts(){
    this.quantityProducts = this.cart.items.reduce((sum,product)=> sum + product.quantity,0);
  }

  setTotal(){
    if (this.cart && this.cart.items)
      this.total = this.cart.items.reduce((sum, item) => sum + item.price,0);
    else 
      this.total = 0;
    
  }

  findProductData(product_Id: number): CartItem {
    return this.cart?.items.find((item: CartItem) => item.product_Id === product_Id);
  }

  private getProductById(id: number): Promise<Product> {
    return this.productsService
      .getById(id)
      .then((res: ProductsResponse) => {
        if (res.error && res.error.errorType !== eErrorType.None) {
          console.error(`Error en getProductById: ${res.error}`);
          return null;
        }
        return res.product;
      })
      .catch((error) => {
        console.error(`Error al obtener producto con id ${id}:`, error);
        return null;
      });
  }

  private insertOrder(cart_Id: number): Promise<Order> {
    this.isLoading = true;
    return this.orderService
      .add({ id: 0, cart_Id })
      .then((res: OrderResponse) => {
        if (res.error && res.error.errorType !== eErrorType.None) {
          console.error(`Error en insertOrder: ${res.error}`);
          return null;
        }
        return res.order;
      })
      .catch((error) => {
        console.error(error);
        return null;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

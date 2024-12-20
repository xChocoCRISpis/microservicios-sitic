import { Component, Input, OnInit } from "@angular/core";
import { eErrorType } from "src/app/shared/interfaces/comun/enums.interface";
import { OrderItem } from "src/app/shared/interfaces/orders/order-items/order-item.interface";
import { Order } from "src/app/shared/interfaces/orders/order/order.interface";
import { OrderItems } from "src/app/shared/interfaces/orders/order/responses/order-items.interface";
import { Product } from "src/app/shared/interfaces/products/product.interface";
import { ProductsResponse } from "src/app/shared/interfaces/products/products-response.interface";
import { ProductsService } from "src/app/shared/services/products.service";

@Component({
  selector: "order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.scss"],
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  @Input() items: OrderItem[];

  products: Product[] =[];

  imageErrorLoad:boolean = false;

  constructor(private readonly serviceProduct: ProductsService) {}

  async ngOnInit() {
    console.log(this.order);
    console.log(this.items);
    try {
      for (const item of this.items) {
        await this.getProduct(item.product_Id);
      }
    } catch (error) {
      console.error("Error procesando los productos de la orden: ", error);
    }
  }

  async getProduct(product_id: number) {
    try {
      const response: ProductsResponse = await this.serviceProduct.getById(product_id);

  
      if (response.error && response.error.errorType !== eErrorType.None) {
        console.error("Error al traer el producto: ", response.error.errorType, "\n", response.error.message);
        return;
      }
  
      this.products.push(response.product);
  
    } catch (error) {
      console.error("Error no determinado: ", error);
    }
  }


  findOrder(product_Id:number):OrderItem{
    const item:OrderItem =   this.items?.find(item => item.product_Id === product_Id);
    console.log(item);
    return item;
  }
}

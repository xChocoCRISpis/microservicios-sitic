import { Component, Input, OnInit } from "@angular/core";
import { CartItem } from "src/app/shared/interfaces/carts/cart-item/cart-item.interface";
import { Product } from "src/app/shared/interfaces/products/product.interface";
import { ProductsService } from "src/app/shared/services/products.service";
import { eErrorType } from "src/app/shared/interfaces/comun/enums.interface";
import { ProductsResponse } from "src/app/shared/interfaces/products/products-response.interface";

@Component({
  selector: "side-bar-item",
  templateUrl: "./side-bar-item.component.html",
  styleUrls: ["./side-bar-item.component.scss"],
})
export class SideBarItemComponent implements OnInit {
  /*  @Input() product:Product; */
  @Input() cartItem: CartItem;
  product: Product;
  error: boolean = false;

  constructor(private readonly productService: ProductsService) {}

  ngOnInit(): void {
    console.log("side bar item: ", this.product);
    console.log("side bar item: ", this.cartItem);
    this.getProduct(this.cartItem.product_Id);
  }

  async getProduct(itemId: number) {
    try {
      const product:ProductsResponse = await this.productService.getById(itemId);
      if (product.error && product.error.errorType === eErrorType.None) {
        console.error(`Error: ${product.error.errorType}, ${product.error.message}`);
        return;
      }

      this.product = product.product;
      console.log(product.product);
    } catch (error) {
      console.error(error);
    }
  }
}

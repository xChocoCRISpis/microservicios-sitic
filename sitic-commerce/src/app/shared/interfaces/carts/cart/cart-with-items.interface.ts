import { CartItem } from "../cart-item/cart-item.interface";
import { Cart } from "./cart.interface";

export interface CartWithItems {
    data:Cart,
    items:CartItem[]
}
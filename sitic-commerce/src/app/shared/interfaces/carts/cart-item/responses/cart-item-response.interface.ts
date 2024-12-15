import { ComunResponse } from "../../../comun/comun-response.interface";
import { CartItem } from "../cart-item.interface";

export interface CartItemResponse extends ComunResponse{
    cartItem:CartItem,
    cartItems:CartItem[]
}
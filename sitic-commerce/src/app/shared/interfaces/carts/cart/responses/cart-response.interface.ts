import { ComunResponse } from "../../../comun/comun-response.interface";
import { Cart } from "../cart.interface";


export interface CartResponse extends ComunResponse{
    cart:Cart,
    carts:Cart[]
}
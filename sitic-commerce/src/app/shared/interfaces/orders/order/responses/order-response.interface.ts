import {ComunResponse} from "../../../comun/comun-response.interface";
import { Order } from "../order.interface";

export interface OrderResponse extends ComunResponse{
    order: Order,
    orders:Order[], 
}
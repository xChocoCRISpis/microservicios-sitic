import { ComunResponse } from "../../../comun/comun-response.interface";
import { OrderItem } from "../order-item.interface";

export interface OrderItemResponse extends ComunResponse{
    orderItem:OrderItem,
    orderItems:OrderItem[]
}
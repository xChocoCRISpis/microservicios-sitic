import { OrderItem } from "../../order-items/order-item.interface"
import { Order } from "../order.interface"

export interface OrderItems{
    order:Order
    items:OrderItem
} 
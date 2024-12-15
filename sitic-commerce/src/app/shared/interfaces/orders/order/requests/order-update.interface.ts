import { eOrderStatus } from "../../../comun/enums.interface";


export interface OrderUpdate {
    id:number,
    status: eOrderStatus,
    total_Price:number,
}
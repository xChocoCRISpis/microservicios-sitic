import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { OrderItemResponse } from "../../interfaces/orders/order-items/responses/order-item-response.interface";
import { lastValueFrom } from "rxjs";
import { OrderItemsUpdate } from "../../interfaces/orders/order-items/requests/order-item-update.interface";

@Injectable({
  providedIn: "root",
})
export class OrderItemService {
  private _actionUrls: string;


  constructor(private readonly http: HttpClient) {
    this._actionUrls = `${environment.URI_SERVER}/OrderItem`;
  }

  
  async getAll():Promise<OrderItemResponse>{
    return await lastValueFrom(this.http.get<OrderItemResponse>(`${this._actionUrls}/GetAll`));
  }


  async getById(id:number):Promise<OrderItemResponse>{
    return await lastValueFrom(this.http.get<OrderItemResponse>(`${this._actionUrls}/GetById`,{
      params:{
        id
      }
    }));
  }

  async update(orderItem:OrderItemsUpdate){
    return await lastValueFrom(this.http.put<OrderItemResponse>(`${this._actionUrls}/Update`,{
      params:{
        orderItem
      }
    }));
  }

  async delete(id:number):Promise<OrderItemResponse>{
    return await lastValueFrom(this.http.delete<OrderItemResponse>(`${this._actionUrls}/Delete`,{
      params:{
        id
      }
    }))
  }
}

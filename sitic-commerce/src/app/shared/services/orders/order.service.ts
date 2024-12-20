import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { OrderResponse } from "../../interfaces/orders/order/responses/order-response.interface";
import { lastValueFrom } from "rxjs";
import { OrderItemsResponse } from "../../interfaces/orders/order/responses/order-items-reponse.interface";
import { OrderInsert } from "../../interfaces/orders/order/requests/order-insert.interface";
import { OrderUpdate } from "../../interfaces/orders/order/requests/order-update.interface";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private _actionUrls:string;

  constructor(private readonly http: HttpClient) {
    this._actionUrls= `${environment.URI_SERVER}/Order`;
  }

  async getAll(id:number):Promise<OrderResponse>{
    return await lastValueFrom(this.http.get<OrderResponse>(`${this._actionUrls}/GetAll`));
  }

  async getById(id:number):Promise<OrderResponse>{
    return await lastValueFrom(this.http.get<OrderResponse>(`${this._actionUrls}/GetById`,{
      params:{
        id
      }
    }));
  }

  async getByOrderItems(id:number):Promise<OrderItemsResponse>{
    return await lastValueFrom(this.http.get<OrderItemsResponse>(`${this._actionUrls}/ByIdOrderItems`,{
      params:{
        id
      }
    }));
  }

  async getAllOrdersItems():Promise<OrderItemsResponse>{
    return await lastValueFrom(this.http.get<OrderItemsResponse>(`${this._actionUrls}/AllOrdersItems`));
  }

  async add(order:OrderInsert):Promise<OrderResponse>{
    return await lastValueFrom(this.http.post<OrderResponse>(`${this._actionUrls}/Insert`,{order}));
  }


  async update(order:OrderUpdate):Promise<OrderResponse>{
    return await lastValueFrom(this.http.put<OrderResponse>(`${this._actionUrls}/Update`,{order}));
  }

  async delete(id:number):Promise<OrderResponse>{
    return await lastValueFrom(this.http.delete<OrderResponse>(`${this._actionUrls}/Delete`,{
      params:{
        id
      }
    }));
  }
}

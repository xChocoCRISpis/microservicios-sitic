import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartResponse } from '../../interfaces/carts/cart/responses/cart-response.interface';
import { ProductsResponse } from '../../interfaces/products/products-response.interface';
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { CartItemResponse } from '../../interfaces/carts/cart-item/responses/cart-item-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _actionUrls:string;
  constructor(
    private readonly http:HttpClient
  ){ 
    this._actionUrls = environment.URI_SERVER+"/Cart";
  }
  
  //Forma deprecated
  getById(id:number):Promise<CartResponse>{
    return this.http.get<CartResponse>(`${this._actionUrls}/GetById`,{
      params: {id}
    }).toPromise();
  }


  //Forma con lasValueFrom, para obtener el ultimo valor del observable en forma de promise
  async getAll():Promise<CartResponse>{
    return await lastValueFrom(this.http.get(`${this._actionUrls}/GetAll`)) as CartResponse;
  }

  async getItems(id:number):Promise<CartItemResponse>{
    return await lastValueFrom(this.http.get(`${this._actionUrls}/GetItems`, {
      params:{
        id
      }
    })) as CartItemResponse;
  }

  async getItem(cart_id:number, item_id:number): Promise<CartItemResponse>{
    return await lastValueFrom(this.http.get(`${this._actionUrls}/GetItem`,{
      params:{
        cart_id,
        item_id
      }
    })) as CartItemResponse;
  }


  async delete(id:number):Promise<CartResponse>{
    return await lastValueFrom(this.http.delete(`${this._actionUrls}/Delete`, {
      params:{
        id,
      }
    })) as CartResponse;
  }
}

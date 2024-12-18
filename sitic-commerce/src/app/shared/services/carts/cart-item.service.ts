import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItemResponse } from '../../interfaces/carts/cart-item/responses/cart-item-response.interface';
import { lastValueFrom } from 'rxjs';
import { CartItemInsert } from '../../interfaces/carts/cart-item/requests/cart-item-update.interface';
import { CartItemUpdate } from '../../interfaces/carts/cart-item/requests/cart-item-insert.interface';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private _actionsUrls:string;
  constructor(
    private readonly http:HttpClient
  ) { 
    this._actionsUrls = environment.URI_SERVER+'/Cart_Items';
  }

  // Retorno sin async/await, retorna de igual manera una Promise
  getById(id:number):Promise<CartItemResponse>{
    return lastValueFrom(this.http.get<CartItemResponse>(`${this._actionsUrls}/GetById`,{
      params:{id}
    }));
  }

  async getAll():Promise<CartItemResponse>{
    return await lastValueFrom(this.http.get<CartItemResponse>(`${this._actionsUrls}/GetAll`));
  }


  /**
 * Representa un artículo del carrito.
 * @typedef {Object} CartItemInsert
 * @property {number} id - Id de retorno del item id
 * @property {number} cart_Id - Id del carro al que se quiere ingresar, si no existe, pasar 0 como parametro para insertarlo en uno nuevo.
 * @property {number} product_Id - Id del articulo que se quiere agregar.
 * @property {number} quantity - La cantidad en el carrito.
 */

  async addItemToCart(cartItem:CartItemInsert):Promise<CartItemResponse>{
    return await lastValueFrom(this.http.post<CartItemResponse>(`${this._actionsUrls}/Insert`,
      {
        cartItem
      }
    ));
  }
  /**
   * Actualiza la cantidad de un producto en el carrito
   * @param cartItem
   * 
   * @returns 
   */
  async updateQuantity(cartItem:CartItemUpdate):Promise<CartItemResponse>{
    

    return await lastValueFrom(this.http.put<CartItemResponse>(`${this._actionsUrls}/Update`,{cartItem:cartItem}));
  }

  async delete(id:number):Promise<CartItemResponse>{
    return await lastValueFrom(this.http.delete<CartItemResponse>(`${this._actionsUrls}/Delete`,{
      params:{
        id
      }
    }));
  }
}

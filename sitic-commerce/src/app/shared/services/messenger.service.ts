import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/carts/cart-item/cart-item.interface';


@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  refreshCart:EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }

  loadCart():Observable<boolean>{
    return true;
  }
}

import { Component, OnInit } from '@angular/core';
import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { Order } from 'src/app/shared/interfaces/orders/order/order.interface';
import { OrderItemsResponse } from 'src/app/shared/interfaces/orders/order/responses/order-items-reponse.interface';
import { OrderItems } from 'src/app/shared/interfaces/orders/order/responses/order-items.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { OrderItemService } from 'src/app/shared/services/orders/order-item.service';
import { OrderService } from 'src/app/shared/services/orders/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders:OrderItems[] =[];
  isLoad:boolean = true;

  constructor(
    private readonly serviceOrder:OrderService,
  ) { }

  async ngOnInit() {
    await this.getAllOrdersAndItems();
    console.log(this.orders);
  }

  async getAllOrdersAndItems(){
    this.isLoad = false;
    await this.serviceOrder.getAllOrdersItems().then(
      (response:OrderItemsResponse)=>{
        if(response.error && response.error.errorType === eErrorType.None){
          console.error("Error al traer todas la ordenes: ",response.error.errorType,"\ln",response.error.message);
          return;
        }
        this.orders = response.orders;
      }
    )
    .catch(error => {
      console.error("Error no determinado: ",error)
    });

    this.isLoad = true;

  }
}

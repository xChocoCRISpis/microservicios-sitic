import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'store',
        loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path:'cart',
        loadChildren: () => import('./modules/cart/cart.module').then(m=>m.CartModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./modules/info/info.module').then(m => m.InfoModule)
      },
      {
        path: '',
        redirectTo: 'store',
        pathMatch: 'full' // Redirige a /products por defecto
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'store' // Ruta comodín para manejar 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

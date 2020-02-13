import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'pnc',
    loadChildren: './pnc/pnc.module#PncModule',
  },
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

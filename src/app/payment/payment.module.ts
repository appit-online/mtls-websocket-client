import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import {RouterModule, Routes} from '@angular/router';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbSpinnerModule, NbUserModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {FilePickerModule} from 'ngx-awesome-uploader';
import {NgxPayPalModule} from 'ngx-paypal';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent
  }
];

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    FilePickerModule,
    NgxPayPalModule,
    NbListModule,
    NbUserModule,
    NbSpinnerModule
  ]
})
export class PaymentModule { }

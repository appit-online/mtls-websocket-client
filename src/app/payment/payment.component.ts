import {Component, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig, PayPalScriptService} from 'ngx-paypal';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalVariablesService} from '../providers/global-variables.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  selectedPackage;
  loading = false;

  payments: any = [
    {
      updates: '5000',
      price: 1.99,
      image: '../assets/lists/0.jpg'
    },{
      updates: '5000',
      price: 4.99,
      image: '../assets/lists/1.jpg'
    }, {
      updates: '10000',
      price: 9.99,
      image: '../assets/lists/2.jpg'
    }, {
      updates: '20000',
      price: 49.99,
      image: '../assets/lists/3.jpg'
    }, {
      updates: '20000',
      price: 99.55,
      image: '../assets/lists/4.jpg'
    }];

  constructor(
    private payPalScriptService: PayPalScriptService, private httpClient: HttpClient,
    private globalVariablesService: GlobalVariablesService
  ) { }

  ngOnInit(): void {
  }

  selectPackage(selectedPackage){
    this.selectedPackage = selectedPackage;
    this.initConfig(selectedPackage);
  }

  private initConfig(selectedPackage): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: environment.PPCID,
      createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
          custom_id: 'WebSocket Donation',
          description: 'WebSocket Donation',
          amount: {
            currency_code: 'EUR',
            value: selectedPackage.price,
          },
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'pay',
        layout: 'vertical',
        color: 'blue',
      },
      onApprove: (data, actions) => {
        this.loading = true;

        actions.order.get().then(details => {
        });
      },
      onClientAuthorization: (data) => {
        this.globalVariablesService.showToast('Thanks for your support =)',
            'top-right', 'success');
      },
      onCancel: (data, actions) => {
        this.globalVariablesService.showToast('We are sorry about your decision, please try again ;)',
          'top-right', 'warning');
      },
      onError: err => {
        this.globalVariablesService.showToast('Actually there was a problem with your payment. Maybe you should contact us: admin@appit-online.de',
          'top-right', 'danger');
      },
      onClick: (data, actions) => {
      }
    };
  }

}

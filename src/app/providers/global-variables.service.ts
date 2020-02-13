import { Injectable } from '@angular/core';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  appVersion: string;
  connected: boolean;
  connectionUrl = '';
  theme = 'default';
  private index = 0;


  constructor(private toastrService: NbToastrService) {
     this.appVersion = '1.0.0';
  }

  showToast(message, position, status) {
    this.index += 1;
    this.toastrService.show(
      '',
      message,
      {position, status});
  }
}

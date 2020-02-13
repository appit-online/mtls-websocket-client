import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalVariablesService} from '../providers/global-variables.service';
import {DomSanitizer} from '@angular/platform-browser';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/solarized_dark';
import 'brace/theme/xcode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sessionLogText = '';
  reqBodyContent = '';
  responseBodyText = '';

  connectBtnTitle = 'Connect';
  clearBtnTitle = 'Clear';
  sendBtnTitle = 'Send';

  ws = null;

  theme = 'solarized_dark';
  options = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 4,
  };

  constructor( public sanitizer: DomSanitizer, private httpClient: HttpClient,  private readonly router: Router,
               private globalVariablesService: GlobalVariablesService) {
  }

  ngOnInit() {
    if (localStorage.getItem('theme') === 'dark') {
      this.theme = 'xcode';
    } else {
      this.theme = 'solarized_dark';
    }

    if (this.globalVariablesService.connected) {
      this.ws = new $WebSocket(this.globalVariablesService.connectionUrl, ['ocpp1.6']);
      this.connectBtnTitle = 'Disconnect';
    } else {
      this.connectBtnTitle = 'Connect';
    }
  }

  connect() {
    if (!this.globalVariablesService.connected) {
      this.ws = new $WebSocket(this.globalVariablesService.connectionUrl, ['ocpp1.6']);
      this.connectBtnTitle = 'Disconnect';

      this.registerListeners();
    } else {
      this.ws.close(true);
      this.reqBodyContent = '';
      this.responseBodyText = '';
      this.globalVariablesService.connected = false;
      this.connectBtnTitle = 'Connect';
    }
  }

  registerListeners() {
    this.ws.onOpen((evt: Event) => {
      this.globalVariablesService.connected = true;
      console.log('onOpen ', evt);
      this.addToLog('#### ' + this.globalVariablesService.connectionUrl + '\nSocket opened');
    });

    this.ws.onMessage((msg: MessageEvent) => {
      console.log('onMessage ', msg.data);
      this.addToLog('>> Message received: ' + msg.data + '\n');
      const t = JSON.parse(msg.data);
      this.responseBodyText = JSON.stringify(t, null, 2);
    });

    this.ws.onError((err: ErrorEvent) => {
      console.log('onError ', err);
      this.globalVariablesService.showToast('An error occurred. Please check your credentials and your client certificate',
          'top-right', 'danger');
      this.globalVariablesService.connected = false;
      this.addToLog(err);
    });

    this.ws.onClose((evt: CloseEvent) => {
      console.log('onClose ', evt);
      this.reqBodyContent = '';
      this.responseBodyText = '';
      this.globalVariablesService.connected = false;
      this.connectBtnTitle = 'Connect';
      this.addToLog('Socket closed\n');
    });
  }

  addToLog(msg) {
    this.sessionLogText += msg + '\n';
  }

  sendBody() {
    try {
      JSON.parse(this.reqBodyContent);
    } catch (e) {
      if (!confirm('Error parsing request body? \n' + e + ' \nContinue anyway?')) {
        return;
      }
    }
    this.ws.send(this.reqBodyContent).subscribe((msg) => {
      console.log('next', msg.data);
    }, (msg) => {
      console.log('error', msg);
    }, () => {
      console.log('send complete');
      this.addToLog('>> Message Sent: ' + this.reqBodyContent.replace(/\s/g, ''));
    });
  }

  clearAll(){
    this.sessionLogText = '';
    this.reqBodyContent = '';
    this.responseBodyText = '';
  }
}

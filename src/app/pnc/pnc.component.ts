import {Component, OnInit} from '@angular/core';
import {GlobalVariablesService} from '../providers/global-variables.service';
import {DomSanitizer} from '@angular/platform-browser';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/solarized_dark';
import 'brace/theme/xcode';

@Component({
  selector: 'app-home',
  templateUrl: './pnc.component.html',
  styleUrls: ['./pnc.component.scss']
})
export class PncComponent implements OnInit {
  sessionLogText = '';
  reqBodyContent = '';
  responseBodyText = '';
  lastMessageId = '';

  clearBtnTitle = 'Clear';
  connectBtnTitle = 'Connect';
  sendBtnTitle = 'Send';

  ws = null;
  usecases = [{
    name: 'client certificate',
    steps: [{
      title: 'Charge point creates boot notification',
      buttons: [
        {
          title: 'Create boot notification',
          template: 'boot_notification_request'
        }]
    }, {
      title: 'Charge point sends request to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }, {
      title: 'Charge point has received a boot notification response',
      todo: 'Verify BootNotificationMessage (Pending)',
    }, {
      title: 'Charge point has received an extended trigger message',
      todo: 'Verify ExtendedTriggerMessage (SignChargePointCertificate)',
    }, {
      title: 'Charge point creates response',
      buttons: [
        {
          title: 'Accepted',
          template: 'response_accepted'
        },
        {
          title: 'Not Implemented',
          template: 'response_not_implemented'
        },
        {
          title: 'Rejected',
          template: 'response_rejected'
        }]
    }, {
        title: 'Charge point sends response to backend',
        buttons: [
          {
            sendMessage: true
          }]
      }, {
      title: 'Charge point creates a CSR',
      buttons: [
        {
          title: 'Create charge point message',
          template: 'csms_csr'
        }]
    }, {
      title: 'Charge point sends request to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }, {
      title: 'The backend provides a response',
      todo: 'Verify result (Accepted, Rejected)',
    }, {
      title: 'The backend provides a new client certificate',
      todo: 'Verify cert result',
    }, {
      title: 'The charge point creates response for certificate request',
      buttons: [
        {
          title: 'Accepted',
          template: 'response_accepted'
        },
        {
          title: 'Rejected',
          template: 'response_rejected'
        }]
    }, {
      title: 'Charge point sends response to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }]
  }, {
    name: 'leaf certificate',
    steps: [{
      title: 'Charge point has received a trigger message',
      todo: 'Verify TriggerMessage (SignV2GCertificate)',
    }, {
      title: 'Charge point creates response',
      buttons: [
        {
          title: 'Accepted',
          template: 'response_accepted'
        },
        {
          title: 'Not Implemented',
          template: 'response_not_implemented'
        },
        {
          title: 'Rejected',
          template: 'response_rejected'
        }]
    }, {
      title: 'Charge point sends response to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }, {
      title: 'Charge point creates a CSR',
      buttons: [
        {
          title: 'Create charge point message',
          template: 'leaf_csr'
        }]
    }, {
      title: 'Charge point sends request to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }, {
      title: 'The backend provides a response',
      todo: 'Verify result (Accepted, Rejected)',
    }, {
      title: 'The backend provides a new leaf certificate',
      todo: 'Verify cert result',
    }, {
      title: 'The charge point creates response for certificate request',
      buttons: [
        {
          title: 'Accepted',
          template: 'response_accepted'
        },
        {
          title: 'Rejected',
          template: 'response_rejected'
        }]
    }, {
      title: 'Charge point sends response to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }]
  }, {
    name: 'request truststore',
    steps: [{
      title: 'Charge point receives request for read certificate of trust store from backend',
      todo: 'Verify GetInstalledCertificateIdsRequest request received',
    }, {
      title: 'Charge point creates response',
      buttons: [
        {
          title: 'Accepted',
          template: 'truststore_response'
        },
        {
          title: 'Not Found',
          template: 'truststore_response_notfound'
        }]
    }, {
      title: 'Charge point sends response to backend - Repeat for each request',
      buttons: [
        {
          sendMessage: true
        }]
    }]
  }, {
    name: 'install truststore',
    steps: [{
      title: 'Charge point receives request for install certificate into trust store',
      todo: 'Verify InstallCertificate request received from backend',
    }, {
      title: 'Charge point creates response',
      buttons: [
        {
          title: 'Accepted',
          template: 'response_accepted'
        },
        {
          title: 'Failed',
          template: 'response_failed'
        }]
    }, {
      title: 'Charge point sends response to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }]
  }, {
    name: 'update ev certificate',
    steps: [{
      title: 'Charge point receives exi request from vehicle',
      buttons: [
        {
          title: 'EXI Request',
          template: 'exiRequest'
        }]
    }, {
      title: 'Charge point sends exi request to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }, {
      title: 'The backend provides a new certificate for the vehicle',
      todo: 'Verify result (Accepted, Failed)'
    }]
  }, {
    name: 'authorize request',
    steps: [{
      title: 'Charge point creates authorize request',
      buttons: [
        {
          title: 'Authorize Request',
          template: 'authorize'
        }]
    }, {
      title: 'Charge point sends authorize request to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }, {
      title: 'The backend provides a response for authorize request',
      todo: ' Verify result (Accepted, Blocked)'
    }, {
      title: 'Charge point creates start transaction request',
      buttons: [
        {
          title: 'Authorize Request',
          template: 'start_transaction'
        }]
    },{
      title: 'Charge point sends start transaction request to backend',
      buttons: [
        {
          sendMessage: true
        }]
    }, {
      title: 'The backend provides a response for start transaction request',
      todo: ' Verify result (Accepted, Blocked)'
    }]
  }];

  /*
    editor
   */
  theme = 'solarized_dark';
  options = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 4,
  };


  constructor(public sanitizer: DomSanitizer, public globalVariablesService: GlobalVariablesService) {
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

  private registerListeners() {
    this.ws.onOpen((evt: Event) => {
      this.globalVariablesService.connected = true;
      console.log('onOpen ', evt);
      this.globalVariablesService.showToast('Connected =)', 'top-right', 'success');
      this.addToLog('#### ' + this.globalVariablesService.connectionUrl + '\nSocket opened');
    });

    this.ws.onMessage((msg: MessageEvent) => {
      console.log('onMessage ', msg.data);
      this.addToLog('>> Message received: ' + msg.data + '\n');
      const t = JSON.parse(msg.data);
      this.lastMessageId = t[1];

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

  clearAll() {
    this.sessionLogText = '';
    this.reqBodyContent = '';
    this.responseBodyText = '';
  }

  setTemplate(messageType) {
    switch (messageType) {
      case 'boot_notification_request':
        this.reqBodyContent = `[
  2,
  "${Date.now()}",
  "BootNotification",
  {
    "chargePointVendor": "manufacturerName",
    "chargePointModel": "718"
  }
]`;
        break;

      case 'authorize':
        this.reqBodyContent = `[
  2,
  "${Date.now()}",
  "Authorize",
  {
    "idTag": "123",
    "idToken": {
        "idToken": "123",
        "type": "eMAID",
        "additionalInfo": [{
            "additionalIdToken": "not_used",
            "type": "not_used"
        }]
    },
    "evseId": [123,456,789],
    "15118CertificateHashData": [{
        "hashAlgorithm": "SHA512",
        "issuerNameHash": "Test",
        "issuerKeyHash": "TEST HASH",
        "serialNumber": "123",
        "responderURL": "testURL"
        },
        {
        "hashAlgorithm": "SHA512",
        "issuerNameHash": "Test1",
        "issuerKeyHash": "TEST1HASH",
        "serialNumber": "456",
        "responderURL": "testURL2"
        }]
  }
]`;
        break;
      case 'truststore_response':
        this.reqBodyContent = `[
  3,
  LAST_MESSAGE_ID,
  {
    "status": "Accepted",
    "certificateHashData": [{
    "hashAlgorithm": "SHA512",
    "issuerNameHash": "Test1",
    "issuerKeyHash": "Test Key1",
    "serialNumber": "123"
    }]
   }
]`;
        break;
      case 'start_transaction':
        this.reqBodyContent = `[
  2,
  "${Date.now()}",
  "StartTransaction",
  {
    "connectorId": 1,
    "idTag": "IDTAG",
    "meterStart": 1200,
    "reservationId": 1234,
    "timestamp": "${new Date().toISOString()}"
  }
]`;
        break;
      case 'truststore_response_notfound':
        this.reqBodyContent = `[
  3,
  LAST_MESSAGE_ID,
  {
    "status": "NotFound"
   }
]`;
        break;

      case 'exiRequest':
        this.reqBodyContent = `[
  2,
  "${Date.now()}",
  "Get15118EVCertificate",
  {
    "15118SchemaVersion": "schemaVersion",
    "exiRequest": "exiPayload"
  }
]`;
        break;

      case 'leaf_csr':
        this.reqBodyContent = `[
  2,
  "${Date.now()}",
  "SignCertificate",
  {
    "typeOfCertificate": "V2GCertificate",
    "csr": "MIIB..."
  }
]`;
        break;

      case 'csms_csr':
        this.reqBodyContent = `[
  2,
  "${Date.now()}",
  "SignCertificate",
  {
    "typeOfCertificate": "ChargingStationCertificate",
    "csr": "MIIB..."
  }
]`;
        break;

      case 'response_accepted':
        this.reqBodyContent = `[
  3,
  LAST_MESSAGE_ID,
  {
    "status": "Accepted"
  }
]`;
        break;

      case 'response_not_implemented':
        this.reqBodyContent = `[
  3,
  LAST_MESSAGE_ID,
  {
    "status": "NotImplemented"
  }
]`;
        break;

      case 'response_rejected':
        this.reqBodyContent = `[
  3,
  LAST_MESSAGE_ID,
  {
    "status": "Rejected"
  }
]`;
        break;

      case 'response_failed':
        this.reqBodyContent = `[
  3,
  LAST_MESSAGE_ID,
  {
    "status": "Failed"
  }
]`;
        break;

    }
    if (this.lastMessageId && this.lastMessageId.length > 0) {
      this.reqBodyContent = this.reqBodyContent.replace('LAST_MESSAGE_ID', '"' + this.lastMessageId + '"');
    }
  }

  authenticate() {
    if (this.globalVariablesService.connected) {
      this.connect();
    } else {
      this.globalVariablesService.authenticationUrl = '';
      this.connectBtnTitle = 'Connecting...';
      const regexUrl = /[a-z0-9]+([\-\.]{1}[a-z0-9]+)*(\.[a-z]{2,5})*(:[0-9]{1,5})?(\/.*)?$/i;

      if (this.globalVariablesService.connectionUrl.match(regexUrl)) {
        if (this.globalVariablesService.connectionUrl.indexOf('localhost') === -1 &&
            this.globalVariablesService.connectionUrl.indexOf('127.0.0.1') === -1 ) {
            this.globalVariablesService.authenticationUrl = this.globalVariablesService.connectionUrl;
        }

        setTimeout(() => {
          this.globalVariablesService.authenticationUrl = '';
          this.connect();
        }, 5000);
      } else {
        this.connectBtnTitle = 'Connect';
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-qr-code',
  templateUrl: './dialog-qr-code.component.html',
  styleUrls: ['./dialog-qr-code.component.css']
})
export class DialogQrCodeComponent implements OnInit {

  availableDevices!: MediaDeviceInfo[]
  hasDevices!: boolean
  qrResult!: string
  hasPermission!: boolean

  constructor() { }

  ngOnInit() {
  }

  onCodeResult(resultString: string) {
    this.qrResult = resultString
  }

}

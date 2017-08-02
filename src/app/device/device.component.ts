import { Subject } from 'rxjs/Rx';
import { DeviceService } from './device.service';
import { Device } from './device';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  devices: Subject<Device[]>;
  selectedDevice = null;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.listDevices()
    .subscribe((devices) => {
      this.devices = devices;
      this.selectedDevice = devices[0];
    });
  }

  onSelected(device) {
    this.selectedDevice = device;
  }

  addDevice() {
    this.selectedDevice = new Device();
  }

}

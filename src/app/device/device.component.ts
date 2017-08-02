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
  devices = [];
  selectedDevice = null;
  errorMessage: string = '';
  successMessage: string = '';
  isAdd: boolean = false;
  isEdit: boolean = false;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.listDevices()
      .subscribe((devices) => {
        this.devices = devices;
        this.selectedDevice = devices[0];
      });
  }

  onAdd() {
    this.isAdd = true;
    this.selectedDevice = new Device();
  }

  onCreated(device) {
    this.deviceService.addDevice(device)
      .map(res => res.json())
      .subscribe(dev => {
        this.successMessage = "Create device Completed";
        this.devices.push(dev);
        this.isAdd = false;
        this.selectedDevice = null;
      });
  }

  onSelected(device) {
    this.selectedDevice = device;
    this.isEdit = true;
  }

  onUpdated(device) {
    this.deviceService.deleteDevice(device)
      .subscribe(() => {
        this.deviceService.addDevice(device)
          .map(res => res.json())
          .subscribe((dev) => {
            this.successMessage = "Updates device Completed";
            this.isEdit = false;
            this.selectedDevice = null;
          });
      });
  }

  onSubmit(device) {
    if(this.isAdd) {
      this.onCreated(device);
    } else {
      this.onUpdated(device);
    }
  }

  onDelete(device: Device) {
    if (confirm('Confirm to Delete this device?')) {
      this.deviceService.deleteDevice(device).subscribe(() => {
        this.successMessage = "Delete device completed";
        this.devices = this.devices.filter(dev1 => dev1 != device);
      });
    }
  }

}

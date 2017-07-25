import { DeviceService } from '../device.service';
import { Device } from '../device';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {
  @Input() device: Device;
  errorMessage: string = "";

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    // this.loginService.logout();
  }

  onSubmit() {
    this.deviceService.updateDevice(this.device);
    // this.loginService.login(this.user)
    // .then(() => this.router.navigate(['/gmap']))
    // .catch((error) => {
    //   this.errorMessage = JSON.parse(error._body).error.message;
    // });
  }

  onDelete() {
    this.deviceService.deleteDevice(this.device).subscribe();
  }

}

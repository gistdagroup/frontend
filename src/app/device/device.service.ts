import { Device } from './device';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeviceService {
  private deviceUrl: string = 'http://gps.gistda.org:8080/api/devices?access_token=:{access_token}';
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private deleteUrl: string = 'http://gps.gistda.org:8080/api/devices/:{id}?access_token=:{access_token}';

  constructor(private http: Http) { }

  listDevices(): Observable<any> {
    const token = localStorage.getItem("gistda_token");
    const url = this.deviceUrl.replace(':{access_token}', token);

    return this.http
      .get(url)
      .map(res => res.json());
  }

  updateDevice(device: Device) {
    const add = () => {
      this.addDevice(device).subscribe();
    };

    if (device.id) {
      this.deleteDevice(device)
        .subscribe(() => add());
    } else {
      add();
    }
  }

  addDevice(device: Device): Observable<any> {
    const token = localStorage.getItem("gistda_token");
    const addUrl = this.deviceUrl.replace(':{access_token}', token);
    const body = { name: device.name, vehicle: device.vehicle };
    return this.http.post(addUrl, body);
  }

  deleteDevice(device: Device): Observable<any> {
    const token = localStorage.getItem("gistda_token");
    const deleteUrl = this.deleteUrl.replace(':{id}', device.id).replace(':{access_token}', token);

    return this.http.delete(deleteUrl);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

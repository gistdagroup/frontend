import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from './device.component';
import { DeviceService } from './device.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
  ],
  declarations: [DeviceComponent],
  providers: [DeviceService],
  exports: [
    DeviceComponent
  ]
})
export class DeviceModule { }

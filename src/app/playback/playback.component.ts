import { Component } from '@angular/core';
import { CarLocation } from '../gmap/car-location';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent {
  title:string = "Playback";
  carLocations: CarLocation[] = [];

  constructor() { }

  onSetData(data: CarLocation[]) {
    this.carLocations = data;
  }

}

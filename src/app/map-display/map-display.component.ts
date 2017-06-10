import { Component, Input } from '@angular/core';
import { CarLocation } from '../gmap/car-location';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent {
  @Input() carLocations = [];
  @Input() title: string = "Map";

  zoom: number = 15;
  strokeColors = ["#CC33FF", "#451348", "#520101", "#020152", "#013c52", "#01523f", "#245201", "#465201", "#523d01", "#522601"];
  latFirst: number = 13.102387838333334;
  lngFirst: number = 100.92743411000001;
  hasLocation: boolean = false;
  selectedBox: CarLocation;
  constructor() { }

  onSelected(carLocation: CarLocation) {
    this.selectedBox = carLocation
    this.latFirst = carLocation.coords[0].lat
    this.lngFirst = carLocation.coords[0].lng
  }

}

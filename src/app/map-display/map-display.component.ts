import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements onChanges {
  @Input() locations = [];
  @Input() title: string = "Map";

  zoom: number = 15;
  scaleControl: boolean = true;
  strokeColors = ["#CC33FF", "#451348", "#520101", "#020152", "#013c52", "#01523f", "#245201", "#465201", "#523d01", "#522601"];
  latFirst: number = 13.102387838333334;
  lngFirst: number = 100.92743411000001;
  hasLocation: boolean = false;
  selectedLocation: Location;
  constructor() { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(changes.locations.currentValue.length == 0) {
      this.selectedLocation = null;
    }
  }

  onSelected(location: Location) {
    this.selectedLocation = location
    this.latFirst = location.coords[0].lat
    this.lngFirst = location.coords[0].lng
  }

  getLat() {
    if(this.selectedLocation) {
      return this.selectedLocation.coords[this.selectedLocation.coords.length - 1].lat
    } else {
      return this.latFirst
    }
  }

  getLng() {
    if(this.selectedLocation) {
      return this.selectedLocation.coords[this.selectedLocation.coords.length - 1].lng
    } else {
      return this.lngFirst
    }
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit {
  zoom: number = 15;
  strokeColors = ["#CC33FF", "#451348", "#520101", "#020152", "#013c52", "#01523f", "#245201", "#465201", "#523d01", "#522601"];

  @Input() carLocations = [];
  @Input() title: string = "Map";
  @Input() latFirst: number = 13.102387838333334;
  @Input() lngFirst: number = 100.92743411000001;

  constructor() { }

  ngOnInit() {
  }

}

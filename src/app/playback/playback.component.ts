import { Component, OnInit } from '@angular/core';
import { SearchPlaybackService } from './search-playback.service';
import 'rxjs/add/operator/map';
import { CarLocation } from '../gmap/car-location';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent implements OnInit {
  carLocations = [];
  latA: number = 13.102387838333334;
  lngA: number = 100.92743411000001;
  zoom: number = 15;
  strokeColors = ["#CC33FF", "#451348", "#520101", "#020152", "#013c52", "#01523f", "#245201", "#465201", "#523d01", "#522601"];

  constructor(private service: SearchPlaybackService) { }
  ngOnInit() {
    this.service.search().subscribe((locations) => {
      // console.log(locations);
      locations.map(location => {
        if(!this.carLocations.some((x) => x.uuid == location.uuid)) {
          this.latA = location.coord.lat;
          this.lngA = location.coord.lng;

          let newLocation = new CarLocation();
          newLocation.uuid = location.uuid
          newLocation.type = location.type
          newLocation.coords.push({ lat: location.coord.lat, lng: location.coord.lng })
          this.carLocations.push(newLocation)
        } else {
          this.carLocations.filter((x) => x.uuid == location.uuid).map((x) => {
            x.coords.push({ lat: location.coord.lat, lng: location.coord.lng })
          })
        }
      })

      console.log(this.carLocations);
    });
  }

}

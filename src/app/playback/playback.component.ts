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
  title:string = "Playback";
  carLocations = [];
  latFirst: number = 13.102387838333334;
  lngFirst: number = 100.92743411000001;

  constructor(private service: SearchPlaybackService) { }

  ngOnInit() {
    this.service.search().subscribe((locations) => {
      locations.map(location => {
        if(!this.carLocations.some((x) => x.uuid == location.uuid)) {
          this.latFirst = location.coord.lat;
          this.lngFirst = location.coord.lng;

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
    });
  }

}

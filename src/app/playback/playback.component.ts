import { Component } from '@angular/core';
import { CarLocation } from '../gmap/car-location';
import { SearchPlaybackService } from './search-playback.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent {
  title:string = "Playback";
  carLocations: CarLocation[] = [];

  constructor(private service: SearchPlaybackService) { }

  onSearch(payload: any) {
    this.service.search(JSON.stringify(payload)).subscribe((locations) => {
      locations.map(location => {
        if(!this.carLocations.some((x) => x.uuid == location.uuid)) {
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

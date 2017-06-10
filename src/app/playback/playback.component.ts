import { Component } from '@angular/core';
import { Location } from '../location';
import { SearchPlaybackService } from './search-playback.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent {
  title:string = "Playback";
  locations: Location[] = [];

  constructor(private service: SearchPlaybackService) { }

  onSearch(payload: any) {
    this.service.search(JSON.stringify(payload)).subscribe((locations) => {
      locations.map(location => {
        if(!this.locations.some((x) => x.uuid == location.uuid)) {
          let newLocation = new Location();
          newLocation.uuid = location.uuid
          newLocation.type = location.type
          newLocation.coords.push({ lat: location.coord.lat, lng: location.coord.lng })
          this.locations.push(newLocation)
        } else {
          this.locations.filter((x) => x.uuid == location.uuid).map((x) => {
            x.coords.push({ lat: location.coord.lat, lng: location.coord.lng })
          })
        }
      })
    });
  }

}

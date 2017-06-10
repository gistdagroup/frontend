import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchPlaybackService } from '../search-playback.service';
import { CarLocation } from '../../gmap/car-location';

@Component({
  selector: 'app-playback-search',
  templateUrl: './playback-search.component.html',
  styleUrls: ['./playback-search.component.scss'],
  providers: [SearchPlaybackService]
})
export class PlaybackSearchComponent implements OnInit {
  dateFrom: Date;
  dateTo: Date;
  carLocationsX = [];
  @Output() carLocations = new EventEmitter<[]>();

  constructor(private service: SearchPlaybackService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.search(this.dateFrom.toISOString(), this.dateTo.toISOString()).subscribe((locations) => {
      locations.map(location => {
        if(!this.carLocationsX.some((x) => x.uuid == location.uuid)) {
          let newLocation = new CarLocation();
          newLocation.uuid = location.uuid
          newLocation.type = location.type
          newLocation.coords.push({ lat: location.coord.lat, lng: location.coord.lng })
          this.carLocationsX.push(newLocation)
        } else {
          this.carLocationsX.filter((x) => x.uuid == location.uuid).map((x) => {
            x.coords.push({ lat: location.coord.lat, lng: location.coord.lng })
          })
        }
      })
      this.carLocations.emit(this.carLocationsX);
    });
  }

}

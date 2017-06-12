import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '../location';

@Component({
    selector: 'app-gmap',
    templateUrl: './gmap.component.html',
    styleUrls: ['./gmap.component.scss']
})

export class GmapComponent implements OnInit {
    title = "Live";
    token = localStorage.getItem("gistda_token");
    urlToChangeStream = 'http://gps.gistda.org:8080/api/locations/change-stream?_format=event-source&access_token=';
    locations = [];

    constructor() { }

    ngOnInit() {
        let url = `${this.urlToChangeStream}${this.token}`;
        let serverConnection = new EventSource(url);
        serverConnection.addEventListener("data", (event) => {this.handleMessage(event, this)});
        serverConnection.addEventListener("error", this.handleError);
        serverConnection.addEventListener("open", this.handleOpen);
    }

    handleMessage(event, self) {
      self.setMapMarkers(JSON.parse(event.data));
    }

    private setMapMarkers(event) {
      if(!this.locations.some((x) => x.uuid == event.data.uuid)) {
        let newLocation = new Location();
        newLocation.uuid = event.data.uuid
        newLocation.type = event.data.type
        if(event.data.type == "ANDROID") {
          newLocation.liveUrl = `http://gps.gistda.org:1935/live/${event.data.uuid}/playlist.m3u8`
        }
        newLocation.coords.push({ lat: event.data.coord.lat, lng: event.data.coord.lng })
        this.locations.push(newLocation)
      } else {
        this.locations.filter((x) => x.uuid == event.data.uuid).map((x) => {
          x.coords.push({ lat: event.data.coord.lat, lng: event.data.coord.lng })
        })
      }
    }

    private handleError(event) {
      console.error("An error happened on the EventSource: ", event.data);
    }

    private handleOpen(event) {
      console.log("The connection is now open.");
    }
  }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '../location';

@Component({
    selector: 'app-gmap',
    templateUrl: './gmap.component.html',
    styleUrls: ['./gmap.component.scss']
})

export class GmapComponent implements OnInit, OnDestroy {
    title = "Live";
    token = localStorage.getItem("gistda_token");
    urlToChangeStream = 'http://gps.gistda.org:8080/api/locations/change-stream?_format=event-source&access_token=';
    locations = [];
    serverConnection: EventSource;
    
    constructor(private router: Router) { }

    ngOnInit() {
        let url = `${this.urlToChangeStream}${this.token}`;
        this.serverConnection = new EventSource(url);
        this.serverConnection.addEventListener("data", (event) => {this.handleMessage(event, this)});
        this.serverConnection.addEventListener("error", this.handleError);
        this.serverConnection.addEventListener("open", this.handleOpen);
    }

    ngOnDestroy() {
      this.serverConnection.close();
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
      localStorage.removeItem("gistda_token");
      this.router.navigate(['/login']);
    }

    private handleOpen(event) {
      console.log("The connection is now open.");
    }
  }

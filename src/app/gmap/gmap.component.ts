import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CarLocation } from './car-location';

@Component({
    selector: 'app-gmap',
    templateUrl: './gmap.component.html',
    styleUrls: ['./gmap.component.scss']
})

export class GmapComponent implements OnInit {
    token = localStorage.getItem("gistda_token");
    urlToChangeStream = 'http://gps.gistda.org:8080/api/locations/change-stream?_format=event-source&access_token=';
    latA: number = 13.102387838333334;
    lngA: number = 100.92743411000001;
    zoom: number = 15;

    carLocations = [];

    strokeColors = ["#CC33FF", "#451348", "#520101", "#020152", "#013c52", "#01523f", "#245201", "#465201", "#523d01", "#522601"]

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
      // console.log(event.data.uuid, ": ", event.data.coord);

      if(!this.carLocations.some((x) => x.uuid == event.data.uuid)) {
        this.latA = event.data.coord.lat;
        this.lngA = event.data.coord.lng;

        let newLocation = new CarLocation();
        newLocation.uuid = event.data.uuid
        newLocation.type = event.data.type
        newLocation.coords.push({ lat: event.data.coord.lat, lng: event.data.coord.lng })
        this.carLocations.push(newLocation)
      } else {
        this.carLocations.filter((x) => x.uuid == event.data.uuid).map((x) => {
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

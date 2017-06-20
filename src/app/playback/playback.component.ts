import { Component } from '@angular/core';
import { Location } from '../location';
import { SearchPlaybackService } from './search-playback.service';
import { SearchVideoService } from './search-video.service';
import * as moment from 'moment';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent {
  title:string = "Playback";
  locations: Location[] = [];
  locationsFromService = [];
  videos = [];
  selectedVideo: any;
  countLoop: number = 0;
  totalLoop: number = 0;

  constructor(private searchPlaybackService: SearchPlaybackService,
    private seachVideoService: SearchVideoService) {}

  private initPayload(criteria: any): any {
    return {
      "between": [
        criteria.dateFrom.toISOString(),
        criteria.dateTo.toISOString()
      ]
    }
  }

  onSearch(criteria: any) {
    let payload = this.initPayload(criteria);
    this.totalLoop = criteria.dateTo.diff(criteria.dateFrom, 'seconds'));

    this.searchPlaybackService.search(payload)
    .subscribe((locations) => {
      this.locationsFromService = locations
      console.log(locations);

      let timer = setInterval(function () {
        mappingLocationByTime();
      }, 1000);

      let mappingLocationByTime = () => {
        console.log(this.countLoop, ":" , this.totalLoop);
        if(this.countLoop >= this.totalLoop) {
          clearInterval(timer);
          return;
        }

        this.simmulateLocations(criteria);
        this.countLoop = this.countLoop + 1;
      }
    });

    this.seachVideoService.search(payload)
    .map(videos => {
      videos.map(video => video.url = `http://gps.gistda.org:1935/vod/mp4:${video.path}/playlist.m3u8?${video.id}`);
      return videos;
    })
    .subscribe((videos) => {
      this.videos = videos
    })
  }

  onClickviewVideo(video: any) {
    this.selectedVideo = video;
  }

  simmulateLocations(criteria: any) {
    let dateFrom = criteria.dateFrom.clone().add(this.countLoop, 's').milliseconds(0)
    let dateTo = criteria.dateFrom.clone().add(this.countLoop + 1, 's').milliseconds(0)
    console.log(dateFrom.toISOString(), ":", dateTo.toISOString());
    this.mappingLocation(this.findLocationBetweenDate(this.locationsFromService, dateFrom, dateTo));

  }

  private mappingLocation(data) {
    console.log(data);
    data.map(location => {
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
    });
  }

  private findLocationBetweenDate = (data, start, end) => {
    return data.filter(location => moment(location.date).isBetween(start, end))
  }

}

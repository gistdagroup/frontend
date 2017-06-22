import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
import { SearchPlaybackService } from './search-playback.service';
import { SearchVideoService } from './search-video.service';
import * as moment from 'moment';
import { Observable }           from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent implements OnInit {
  title:string = "Playback";
  locations: Location[] = [];
  locationsFromService = [];
  videos = [];
  selectedVideo: any;
  countLoop: number = 0;
  totalLoop: number = 0;
  simmulationTime: Date;

  private searchTerms = new Subject<any>();
  private isPlay: Subject<boolean> = new Subject<boolean>();
  currentCriteria: any;

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

  ngOnInit(): void {
    let locationSeacher = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.searchLocationsAndVideos(this.initPayload(term))
        : Observable.of([]))

    locationSeacher.subscribe(() => {
      this.onPlay();
    });

    const pausable = this.isPlay
      .switchMap(played => played
        ? this.playback()
        : Observable.never())

    pausable.subscribe()
  }

  onSearch(criteria: any) {
    this.countLoop = 0;
    this.totalLoop = 0;
    this.currentCriteria = criteria;
    this.searchTerms.next(criteria);
  }

  searchLocationsAndVideos(payload): Observable<any> {
    const locationsData = this.searchPlaybackService.search(payload)
    locationsData.subscribe(locations => {
      console.log(locations;
      this.locationsFromService = locations
    })

    const videosData = this.seachVideoService.search(payload)
      .map(videos => {
        videos.map(video => video.url = `http://gps.gistda.org:1935/vod/mp4:${video.path}/playlist.m3u8?${video.id}`);
        return videos;
      })

      videosData.subscribe(videos => {
        console.log(videos);
        this.videos = videos
      })

    return Observable.of([]);
  }

  playback() {
    return Observable
        .interval(1000)
        .takeWhile(() => this.countLoop < this.totalLoop)
        .map((x) => {
          this.countLoop = this.countLoop + 1
          this.simmulateLocations(this.currentCriteria);
        })
  }

  onPlay() {
    this.totalLoop = this.currentCriteria.dateTo.diff(this.currentCriteria.dateFrom, 'seconds'));
    this.isPlay.next(true);
    // console.log("play");
  }

  onPause() {
    this.isPlay.next(false);
    // console.log("pause");
  }

  onClickviewVideo(video: any) {
    this.selectedVideo = video;
  }

  simmulateLocations(criteria: any) {
    let dateFrom = criteria.dateFrom.clone().add(this.countLoop, 's').milliseconds(0)
    this.simmulationTime = dateFrom;
    let dateTo = criteria.dateFrom.clone().add(this.countLoop + 1, 's').milliseconds(0)
    // console.log(dateFrom.toISOString(), ":", dateTo.toISOString());
    this.mappingLocation(this.findLocationBetweenDate(this.locationsFromService, dateFrom, dateTo));
    this.mappingVideo()
  }

  private mappingVideo() {
    this.videos.map(video => {
      this.locations.filter(location => location.uuid == video.uuid).map(location => {
          location.liveUrl = video.url
      })
    })
  }

  private mappingLocation(data) {
    // console.log(data);
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
    return data.filter(location => moment(location.date).isBetween(start, end, null, '[]'))
  }

}

import { Component } from '@angular/core';
import { Location } from '../location';
import { SearchPlaybackService } from './search-playback.service';
import { SearchVideoService } from './search-video.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent {
  title:string = "Playback";
  locations: Location[] = [];
  videos = [];
  selectedVideo: any;

  constructor(private searchPlaybackService: SearchPlaybackService,
    private seachVideoService: SearchVideoService) {}

  onSearch(payload: any) {
    this.searchPlaybackService.search(payload).subscribe((locations) => {
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

}

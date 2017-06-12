import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
declare var videojs:any;

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnChanges {
  @Input() videoUrl: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let player = videojs('example-video');
    let videoUrl = this.videoUrl;
    player.ready(function() {
      player.src({
        src: videoUrl,
        type: 'application/x-mpegURL'
      });

      player.play();
  }

}

import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
declare var videojs:any;
@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnChanges {
  @Input() videoUrl: string;
  myPlayer: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.myPlayer = videojs('video-display');

    let initPlayer = () => {
      this.myPlayer.src({
        src: this.videoUrl,
        type: 'application/x-mpegURL'
      });

      this.myPlayer.play();
    }

    this.myPlayer.ready(function() {
      initPlayer();
    });
  }

  seek() {
    this.myPlayer.currentTime(30);
  }

}

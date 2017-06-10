import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-playback-search',
  templateUrl: './playback-search.component.html',
  styleUrls: ['./playback-search.component.scss']
})
export class PlaybackSearchComponent {
  dateFrom: Date;
  dateTo: Date;
  @Output() payloads = new EventEmitter<any>();

  constructor() { }

  onSubmit() {
    let payload = {
      "where": {
        "date": {
          "between": [
            this.dateFrom.toISOString(),
            this.dateTo.toISOString()
          ]
        }
      }
    }

    this.payloads.emit(payload);
  }

}

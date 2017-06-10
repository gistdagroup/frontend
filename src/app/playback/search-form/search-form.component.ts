import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
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

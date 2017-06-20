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
    let criteria = {
      dateFrom: this.dateFrom.seconds(0),
      dateTo: this.dateTo.seconds(0)
    }

    this.payloads.emit(criteria);
  }

}

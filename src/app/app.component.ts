import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Gistda Map!';
    token = localStorage.getItem("gistda_token");
    constructor() { }
}

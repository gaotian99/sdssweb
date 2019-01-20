import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'sdssweb';
  darkTheme = false;
  switchTheme(dark) {
    this.darkTheme = dark.checked;
  }
}

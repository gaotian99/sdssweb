import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'sdssweb';
  darkTheme = false;

  constructor(private oc: OverlayContainer) {}

  switchTheme(dark) {
    this.darkTheme = dark.checked;
    //this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
  }
}

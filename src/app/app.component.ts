import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <a href="https://usertechnologies.com" target="blank">
      <div class="ut-logo floating"></div>
    </a>
  `
})
export class AppComponent {
}

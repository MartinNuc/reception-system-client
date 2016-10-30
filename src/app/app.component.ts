import {Component, ViewChild} from '@angular/core';
import {IframeModalComponent} from './components/iframe-modal-component/iframe-modal.component';

@Component({
  selector: 'app-root',
  template: `
    <iframe-modal></iframe-modal>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <div (click)="iframeModal.show('https://www.usertechnologies.com')" class="ut-logo floating"></div>
  `
})
export class AppComponent {
  @ViewChild(IframeModalComponent)
  public readonly iframeModal: IframeModalComponent;
}

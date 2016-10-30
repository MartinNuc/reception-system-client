import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'iframe-modal',
  styleUrls: ['./iframe-modal.component.less'],
  templateUrl: './iframe-modal.component.html',
})
export class IframeModalComponent {
  protected isVisible: boolean = false;
  protected companyUrl: any;

  constructor(protected sanitizer: DomSanitizer) {}

  show(companyUrl: string) {
    this.companyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(companyUrl);
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
    this.companyUrl = '';
  }

  resizeIframe(iframe) {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
  }
}

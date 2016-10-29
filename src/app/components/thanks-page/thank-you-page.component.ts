import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  styleUrls: ['./thank-you-page.component.less'],
  template: `
    <div class="heading row">
      <h1>Thank you <span class="hp-yellow">{{visitorName}}</span>,</h1>
    </div>
    
    <div class="row info">
      <div class="avatar col-xs-12 col-md-4" *ngIf="!!avatar">
        <img src="{{avatar}}">
      </div>
      
      <div class="notification col-md-offset-1 col-xs-12 col-md-7">
        <span class="hp-yellow">{{name}}</span> has been notified, please wait.
      </div>
    </div>
    <div class="row buttons">
      <a class="start-over btn animated arrow-left" routerLink="/">&lt; Start over</a>
      <button class="company-profile btn animated arrow-up" (click)="showHideCompanyWeb()">Company profile</button>
    </div>
    
    <div *ngIf="companyWebVisible">
      <hr>
      <iframe class="company-web-iframe" [src]="companyUrl"></iframe>
    </div>
    `
})
export class ThankYouPageComponent implements OnInit {
  private name: string;
  private visitorName: string;
  private avatar: string;
  private companyUrl: any;
  private companyWebVisible: boolean = false;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.name = params['name'];
      this.visitorName = params['visitorName'];
      this.avatar = params['avatar'];
      this.companyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(params['companyUrl']);
    });
  }

  showHideCompanyWeb() {
    this.companyWebVisible = !this.companyWebVisible;
  }

}

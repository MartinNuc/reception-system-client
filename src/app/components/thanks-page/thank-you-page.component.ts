import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  styleUrls: ['./thank-you-page.component.less'],
  template: `
    <div class="heading row">
      <h1>Thank you <span class="hp-yellow">{{visitorName}}</span>,</h1>
    </div>
    
    <div class="row info">
      <div class="avatar col-xs-12 col-md-4">
        <img src="{{avatar}}">
      </div>
      
      <div class="notification col-md-offset-1 col-xs-12 col-md-7">
        <span class="hp-yellow">{{name}}</span> has been notified, please wait.
      </div>
    </div>
    
    <div class="row buttons">
      <a class="start-over btn animated arrow-left" routerLink="/">&lt; Start over</a>
      <a class="company-profile btn animated arrow-up" routerLink="/">Company profile</a>
    </div>
    `
})
export class ThankYouPageComponent implements OnInit {
  private name: string;
  private visitorName: string;
  private avatar: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.name = params['name'];
      this.visitorName = params['visitorName'];
      this.avatar = params['avatar'];
    });
  }

}

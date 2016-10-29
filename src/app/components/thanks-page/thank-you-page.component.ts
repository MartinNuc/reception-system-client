import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  template: `
    Thank you {{visitorName}},
    
    <img src="{{avatar}}">
    
    {{name}} has been notified, please wait.
    
    <a routerLink="/" routerLinkActive="active">Start over</a>
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

import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {LicenceService} from '../../services/licence.service';
import {Licence} from '../../models/licence.model';
import {Company} from '../../models/company.model';
import {VisitorFormData} from '../../models/visitor.model';
import {VisitService} from '../../services/visit.service';
import {Router} from '@angular/router';

@Component({
  template: `
    <form (ngSubmit)="onSubmit()" #visitorForm="ngForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" required
               [(ngModel)]="visitorFormData.name" name="name">
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input type="text" class="form-control" id="surName" required
               [(ngModel)]="visitorFormData.surName" name="surName" >
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" required
               [(ngModel)]="visitorFormData.email" name="email" >
      </div>

      <div class="form-group">
        <label for="company">Which company?</label>
        <select class="form-control" id="company" required
                [(ngModel)]="visitorFormData.company" name="company">
          <option *ngFor="let company of companies" [ngValue]="company">{{company.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="person">Who in {{visitorFormData.company?.name || '...'}}</label>
        <select class="form-control" id="person" required
                [(ngModel)]="visitorFormData.person" name="person">
          <option *ngFor="let employee of visitorFormData.company?.employees" [ngValue]="employee">{{employee.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="reason">Reason for your visit?</label>
        <select class="form-control" id="reason" required
                [(ngModel)]="visitorFormData.reason" name="reason">
          <option *ngFor="let reason of reasons" [ngValue]="reason">{{reason}}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-default" [disabled]="!visitorForm.form.valid">Submit</button>
    </form>
`
})
export class ReceptionPageComponent implements OnInit {

  protected companies: Array<Company> = [];
  protected reasons: Array<String> = [
    "Meeting",
    "Package delivery",
    "Another reason"
  ];
  protected visitorFormData: VisitorFormData = {};

  constructor(protected router: Router,
              protected companyService: CompanyService,
              protected licenceService: LicenceService,
              protected visitService: VisitService) {
  }

  ngOnInit(): void {
    this.loadDataForForm();
  }

  loadDataForForm(): void {
    this.licenceService.loadLicence().subscribe((licence: Licence) => {
      licence.companyIds.forEach((companyId) => {
        this.companyService.loadCompany(companyId).subscribe((company) => {
          this.companies.push(company);
        })
      });
    });
  }

  onSubmit() {
    this.visitService.visit(this.visitorFormData).subscribe((result) => {
      this.router.navigate(['/thank-you', {
        visitorName: `${this.visitorFormData.name || ''} ${this.visitorFormData.surname || ''}`,
        avatar: this.visitorFormData.person.avatar,
        name: this.visitorFormData.person.name
      }], {skipLocationChange: true});
    });
  }
}

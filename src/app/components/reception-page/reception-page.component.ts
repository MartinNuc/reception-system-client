import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {LicenceService} from '../../services/licence.service';
import {Licence} from '../../models/licence.model';
import {Company} from '../../models/company.model';
import {VisitorFormData} from '../../models/visitor.model';
import {VisitService} from '../../services/visit.service';
import {Router} from '@angular/router';

@Component({
  template: `
    <h1 class="hp-yellow">Welcome</h1>
    <form (ngSubmit)="onSubmit()" #visitorForm="ngForm">
    <div class="row">
      <div class="form-group col-md-6">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" required
                tabindex="1"
               [(ngModel)]="visitorFormData.name" name="name">
      </div>
      <div class="form-group col-md-6">
        <label for="company">Which company?</label>
        <select class="form-control" id="company" required
              tabindex="4" (change)="onCompanyChange()"
                [(ngModel)]="visitorFormData.company" name="company">
          <option *ngFor="let company of companies" [ngValue]="company">{{company.name}}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="surname">Surname</label>
        <input type="text" class="form-control" id="surName" required
              tabindex="2"
               [(ngModel)]="visitorFormData.surName" name="surName" >
      </div>
      <div class="form-group col-md-6">
        <label for="person">Who in {{visitorFormData.company?.name || '...'}}</label>
        <div class="clearfix "></div>
        <input type="text" class="form-control" id="person" required auto-complete
              #person
              tabindex="5"
               [(ngModel)]="visitorFormData.person" name="person" [source]="visitorFormData.company?.employees"
               value-property-name="employee"
               display-property-name="name"
               [disabled]="!visitorFormData.company">
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" required
              tabindex="3"
               [(ngModel)]="visitorFormData.email" name="email" >
      </div>
      <div class="col-md-6">
        <label>Reason for your visit?</label>
        
        <div class="radio" *ngFor="let reason of reasons">
          <label>
            <input [(ngModel)]="visitorFormData.reason" type="radio" name="reason" [value]="reason"
            tabindex="6">
            {{reason}}
          </label>
        </div>
      </div>
    </div>
    
    <button type="submit" class="btn animated arrow-right pull-right" [disabled]="!visitorForm.form.valid">Submit &gt;</button>
    </form>
    
    <small>Clicking on submit button you agree to share your personal information.</small>
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

  @ViewChild('person') personInput;

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
          company.employees = company.employees.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          this.companies.push(company);
        })
      });
    });
  }

  onSubmit() {
    this.visitService.visit(this.visitorFormData).subscribe((result) => {
      this.router.navigate(['/thank-you', {
        visitorName: this.visitorFormData.name,
        avatar: this.visitorFormData.person.avatar,
        name: this.visitorFormData.person.name
      }], {skipLocationChange: true});
    });
  }

  onCompanyChange() {
    this.visitorFormData.person = undefined;
    setTimeout(() => (this.personInput.nativeElement.focus()), 400);
  }
}

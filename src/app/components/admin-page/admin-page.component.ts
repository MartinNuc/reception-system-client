import {Component} from '@angular/core';
import {VisitService} from '../../services/visit.service';
import {Company} from '../../models/company.model';
import {Licence} from '../../models/licence.model';
import {LicenceService} from '../../services/licence.service';
import {CompanyService} from '../../services/company.service';

@Component({
  styleUrls: ['./admin-page.component.less'],
  template: `
    <form class="history-form" (ngSubmit)="queryCompany()" #historyForm="ngForm">
      <div class="row">
        <div class="col-xs-12 col-sm-4">
          <label for="company">Select company</label>
          <select class="form-control" id="company" required tabindex="4"
                  [(ngModel)]="selectedCompany" name="company">
            <option *ngFor="let company of companies" [ngValue]="company">{{company.name}}</option>
          </select>
        </div>
        <div class="col-xs-12 col-sm-4">
          <label for="from">From</label>
          <datepicker id="from" [(ngModel)]="from" name="from" [expanded]="true"></datepicker>
        </div>
        <div class="col-xs-12 col-sm-4">
          <label for="to">To</label>
          <datepicker id="from" [(ngModel)]="to" name="to" [expanded]="true"></datepicker>
        </div>
      </div>
      
      <button type="submit" class="btn animated arrow-right pull-right" [disabled]="!historyForm.form.valid">
        Query &gt;
      </button>

    </form>
    
    <table class="table table-striped">
      <tr>
        <th>Timestamp</th>
        <th>Visitor</th>
        <th>Reason</th>
        <th>Visitee</th>
      </tr>
      <tr *ngFor="let visit of visits">
        <td>{{visit.timestamp | date:'short'}}</td>
        <td>{{visit.visitor.name}} (<a href="mailto:{{visit.visitor.email}}">{{visit.visitor.email}}</a>)</td>
        <td>{{visit.reason}}</td>
        <td>{{visit.wantsToMeet.name}} (<a href="mailto:{{visit.wantsToMeet.email}}">{{visit.wantsToMeet.email}}</a>)</td>
      </tr>
      <tr *ngIf="!visits || visits.length == 0">
         <td class="text-center" colspan="4">No data</td>
      </tr>
    </table>
  `
})
export class AdminPageComponent {
  visits: Array<any>;
  companies: Array<Company> = [];
  selectedCompany: Company;
  from: Date;
  to: Date;

  constructor(protected visitsService: VisitService,
              protected companyService: CompanyService,
              protected licenceService: LicenceService) {

    this.loadCompanies();
  }

  queryCompany() {
    this.visitsService.query({
      from: (this.from ? new Date(this.from).getTime() : 0),
      to: (this.to ? new Date(this.to).getTime() : Number.MAX_SAFE_INTEGER || 9007199254740991),
      companyId: this.selectedCompany.uuid
    }).subscribe((data) => {
      this.visits = data;
    })
  }

  loadCompanies() {
    this.licenceService.loadLicence().subscribe((licence: Licence) => {
      licence.companyIds.forEach((companyId) => {
        this.companyService.loadCompany(companyId).subscribe((company) => {
          this.companies.push(company);
        });
      });
    });
  }
}

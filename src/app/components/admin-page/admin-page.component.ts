import {Component} from '@angular/core';
import {VisitService} from '../../services/visit.service';
import {Company} from '../../models/company.model';
import {Licence} from '../../models/licence.model';
import {LicenceService} from '../../services/licence.service';
import {CompanyService} from '../../services/company.service';
import {DatePipe} from '@angular/common';

@Component({
  styleUrls: ['./admin-page.component.less'],
  template: `
    <form class="history-form" (ngSubmit)="displayResultOnPage()" #historyForm="ngForm">
      <div class="row">
        <div class="col-xs-12 col-sm-4 form-group">
          <label for="company">Select company</label>
          <select class="form-control" id="company" required tabindex="4"
                  [(ngModel)]="selectedCompany" name="company">
            <option *ngFor="let company of companies" [ngValue]="company">{{company.name}}</option>
          </select>
        </div>
        <div class="col-xs-12 col-sm-4 form-group">
          <label for="from">From</label>
          <datepicker id="from" [(ngModel)]="from" name="from" [expanded]="true"></datepicker>
        </div>
        <div class="col-xs-12 col-sm-4 form-group">
          <label for="to">To</label>
          <datepicker id="from" [(ngModel)]="to" name="to" [expanded]="true"></datepicker>
        </div>
      </div>
      
      <button type="submit" class="btn btn-yellow pull-right" [disabled]="!historyForm.form.valid">
        Query &gt;
      </button>
      <button type="button" class="btn export-button btn-yellow animated pull-right" (click)="downloadAsCsv()" [disabled]="!historyForm.form.valid">
        Export as CSV
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
              protected licenceService: LicenceService,
              protected datePipe: DatePipe) {

    this.loadCompanies();
  }

  displayResultOnPage() {
    this.queryCompany().subscribe((data) => {
      this.visits = data;
    })
  }

  downloadAsCsv() {
    this.queryCompany().subscribe((data) => {
      var csvContent = "data:text/csv;charset=utf-8,";
      csvContent += 'timestamp,visitor name,visitor email,reason,visitee name, visitee email\n';
      data.forEach((row, index) => {
        let timestamp = this.datePipe.transform(new Date(row.timestamp), 'short');
        timestamp = timestamp.replace(',', '');
        let dataString = `${timestamp},${row.visitor.name},${row.visitor.email},${row.reason},${row.wantsToMeet.name},${row.wantsToMeet.email}`;
        csvContent += index < data.length ? dataString+ "\n" : dataString;
      });

      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri, 'blank');
    })
  }

  queryCompany() {

    let from = 0;
    if (this.from) {
      let date = new Date(this.from);
      date.setHours(0);
      date.setMinutes(0);
      from = date.getTime()
    }

    let to = Number.MAX_SAFE_INTEGER || 9007199254740991;
    if (this.to){
      let date = new Date(this.to);
      date.setHours(23);
      date.setMinutes(59);
      to = date.getTime();
    }

    return this.visitsService.query({
      from,
      to,
      companyId: this.selectedCompany.uuid
    });
  }

  loadCompanies() {
    this.licenceService.loadLicence().subscribe((licence: Licence) => {
      licence.companyIds.forEach((companyId) => {
        this.companyService.loadCompany(companyId).subscribe((company) => {
          this.companies.push(company);
          if (!this.selectedCompany) {
            this.selectedCompany = company;
          }
        });
      });
    });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {LicenceService} from '../../services/licence.service';
import {Licence} from '../../models/licence.model';
import {Company} from '../../models/company.model';
import {VisitorFormData} from '../../models/visitor.model';
import {VisitService} from '../../services/visit.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './reception-page.component.html'
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
      let routeParams: any = {
        visitorName: this.visitorFormData.name,
        name: this.visitorFormData.person.name,
        companyUrl: this.visitorFormData.company.url
      };
      if (this.visitorFormData.person.avatar) {
        routeParams.avatar = this.visitorFormData.person.avatar;
      }
      this.router.navigate(['/thank-you', routeParams], {skipLocationChange: true});
    });
  }

  onCompanyChange() {
    delete this.visitorFormData.person;
    setTimeout(() => (this.personInput.nativeElement.focus()), 400);
  }
}

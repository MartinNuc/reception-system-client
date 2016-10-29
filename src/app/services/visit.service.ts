import {Injectable} from '@angular/core';
import {VisitorFormData} from '../models/visitor.model';
import {Headers, RequestOptions, Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class VisitService {

  constructor(protected http: Http, protected configurationService: ConfigurationService) {
  }

  visit(visitorFormData: VisitorFormData): Observable<any> {
    let body = JSON.stringify(this.convertFormData(visitorFormData));
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.configurationService.getApiUrl() + '/visit', body, options)
      .map((res: Response) => res.json());
  }

  convertFormData(formData: VisitorFormData) {
    let result: any = {};
    result.email = formData.email;
    result.name = formData.name;
    result.surname = formData.surname;
    result.reason = formData.reason;
    result.companyId = formData.company.uuid;
    result.wantedPersonEmail = formData.person.email;
    return result;
  }
}

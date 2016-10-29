import {Injectable} from '@angular/core';
import {VisitorFormData} from '../models/visitor.model';
import {Headers, RequestOptions, Http, Response, URLSearchParams} from '@angular/http';
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

    return this.http.post(this.configurationService.getApiUrl() + '/visits', body, options)
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

  query(params: {from; to; companyId}) {
    let queryParams: URLSearchParams = new URLSearchParams();
    queryParams.set('from', params.from);
    queryParams.set('to', params.to);

    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-company': params.companyId
    });
    let options = new RequestOptions({
      headers: headers,
      search: queryParams
    });

    return this.http.get(this.configurationService.getApiUrl() + '/visits', options)
      .map((res: Response) => res.json())
      .map((res: any) => res.Items);
  }
}

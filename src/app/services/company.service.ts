import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '../models/company.model';
import {ConfigurationService} from './configuration.service';
import {Http, Response} from '@angular/http';

@Injectable()
export class CompanyService {

  constructor(protected http: Http, protected configurationService: ConfigurationService) {
  }

  loadCompany(companyId): Observable<Company> {

    return this.http.get(`${this.configurationService.getApiUrl()}/companies/${companyId}`)
      .map((res: Response) => res.json())
      .map((res) => res.Item)
      .cache()
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

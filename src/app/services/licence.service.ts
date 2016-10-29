import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Licence} from '../models/licence.model';
import {ConfigurationService} from './configuration.service';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class LicenceService {

  constructor(protected http: Http, protected configurationService: ConfigurationService) {
  }

  loadLicence(): Observable<Licence> {

    let licenceKey = this.configurationService.getLicenceKey();

    let headers = new Headers({'X-Licence': licenceKey});
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.configurationService.getApiUrl()}/licences`, options)
      .map((res: Response) => res.json())
      .map((res) => res.Item)
      .map((res) => ({uuid: res.uuid, companyIds: res.companies}))
      .cache()
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

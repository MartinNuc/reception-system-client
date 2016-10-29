import {Injectable} from '@angular/core';
@Injectable()
export class ConfigurationService {
  getApiUrl() {
    return 'https://tyzcyyww25.execute-api.eu-central-1.amazonaws.com/prod';
  }

  getLicenceKey() {
    return '2ac82b21-e79a-450a-ba6b-28a573c08256';
  }
}

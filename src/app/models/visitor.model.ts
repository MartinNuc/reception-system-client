import {Employee} from './employee.model';
import {Company} from './company.model';
export interface VisitorFormData {
  name?: string,
  surname?: string,
  email?: string,
  reason?: string,
  company?: Company,
  person?: Employee,
}

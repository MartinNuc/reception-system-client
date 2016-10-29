import {Employee} from './employee.model';

export interface Company {
  url: string;
  uuid: string,
  name: string,
  employees: Array<Employee>
}

import {Employee} from './employee.model';

export interface Company {
  uuid: string,
  name: string,
  employees: Array<Employee>
}

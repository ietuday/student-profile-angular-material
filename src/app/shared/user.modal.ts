import { IModel } from '../core/shared/IModel';

export class User implements IModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  confirmPassword: string;
  password: string;
  resourceId: string;
  role: {
    id: string;
    name: string;
    label: string;
  };
  isActive = true;

  constructor(values?: Object) {
    if (values) {
      Object.assign(this, values);
    }
  }
}

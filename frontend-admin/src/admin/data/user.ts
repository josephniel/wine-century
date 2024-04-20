export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  permissions: string[];
}

export enum USER_PERMISSIONS {
  VIEW_USER = 'VIEW_USER',
  ADD_USER = 'ADD_USER',
  EDIT_USER = 'EDIT_USER',
  DELETE_USER = 'DELETE_USER'
}

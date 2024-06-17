import { Role } from "./role.model";

export class User {
  _id?: string;
  name?: string;
  identificationCard?: string;
  email: string;
  password?: string;
  token?: string;
  role?: Role;
}

import { User } from "./user.model";

export class Role {
  _id: string;
  name: string;
  description: string;
  user?: User;
}

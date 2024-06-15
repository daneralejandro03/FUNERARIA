import { Cause } from "./cause.model";

export class Deceased {
  id?: number;
  nombre: string;
  fecha: Date;
  causa?: Cause;
}

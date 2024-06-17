import { City } from "./city.model";

export class Department {
  id?: number;
  name: string;
  description?: string;
  cityCapitalId?: number;
  municipalities?: number;
  surface?: number;
  population?: number;
  phonePrefix?: string;
  countryId?: number;
  cities?: City[];
}

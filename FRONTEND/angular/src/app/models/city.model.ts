import { Department } from "./department.model";

export class City {
  id?: number;
  name: string;
  description?: string;
  surface?: number;
  population?: number;
  postalCode?: string;
  departmentId: number;
  department?: Department;
}

import { Site } from "./site.model";

export class WakeRoom {
  id?: number;
  capacity: number;
  availability: boolean;
  site_id: number;
  site?: Site;
}

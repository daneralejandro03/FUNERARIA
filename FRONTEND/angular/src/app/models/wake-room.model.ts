import { Burial } from "./burial.model";
import { Cremation } from "./cremation.model";
import { Site } from "./site.model";

export class WakeRoom {
  id?: number;
  name: string;
  capacity: number;
  availability: boolean;
  site_id?: number;
  burials?: Burial[];
  cremations?: Cremation[];
}

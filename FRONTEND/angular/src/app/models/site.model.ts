import { WakeRoom } from "./wake-room.model";

export class Site {
  id?: number;
  name: string;
  location: string;
  email: string;
  department_name?: string;
  city_name?: string;
  department_id: number;
  city_id: number;
  WakeRooms?: WakeRoom[];
}

import { WakeRoom } from "./wake-room.model";

export class Site {
  id?: number;
  name: string;
  location: string;
  email: string;
  city_id: number;
  WakeRooms: WakeRoom[];
}

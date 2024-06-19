import { Incident } from "./incident.model";
import { Message } from "./message.model";

export class Chat {
  id?: number;
  start_date: Date;
  state: boolean;
  incident?: Incident;
  messages?: Message[];
}

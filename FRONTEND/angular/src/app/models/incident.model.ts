import { Chat } from "./chat.model";

export class Incident {
  id: number;
  date_decease: Date;
  place_decease: string;
  cause_decease: string;
  chat?: Chat;
}

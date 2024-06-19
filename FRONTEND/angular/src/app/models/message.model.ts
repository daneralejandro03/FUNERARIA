import { Chat } from "./chat.model";

export class Message {
  id: number;
  information: string;
  user_id: string;
  chat_id: number;
  chat?: Chat;
}

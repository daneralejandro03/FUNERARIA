import { EventEmitter, Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebSocketService extends Socket {
  newMessage = new EventEmitter<any>();
  updateMessage = new EventEmitter<any>();
  deleteMessage = new EventEmitter<any>();

  constructor() {
    super({
      url: environment.url_ms_negocio,
      options: {
        query: {},
      },
    });

    this.listen();
  }

  joinChat(chatId: number) {
    this.emit("join_chat", chatId);
  }

  leaveChat(chatId: number) {
    this.emit("leave_chat", chatId);
  }

  sendMessage(chatId: number, message: any) {
    this.emit("send_message", { chatId, message });
  }

  private listen() {
    this.on("new_message", (message: any) => this.newMessage.emit(message));
    this.on("update_message", (message: any) =>
      this.updateMessage.emit(message)
    );
    this.on("delete_message", (message: any) =>
      this.deleteMessage.emit(message)
    );
  }
}

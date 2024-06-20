import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Message } from "src/app/models/message.model";
import { User } from "src/app/models/user.model";
import { LocalStorageServiceService } from "src/app/services/local-storage-service.service";
import { UserService } from "src/app/services/user.service";
import { WebSocketService } from "src/app/services/web-socket.service";

@Component({
  selector: "app-manage-message",
  templateUrl: "./manage-message.component.html",
  styleUrls: ["./manage-message.component.scss"],
  providers: [DatePipe], // Añade DatePipe como provider
})
export class ManageMessageComponent implements OnInit, OnDestroy {
  chatId: number;
  messages: Message[];
  message: Message;
  userData: User;
  users: User[];
  newMessage: string;

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageServiceService,
    private datePipe: DatePipe, // Inyecta DatePipe
    private userService: UserService // Inyecta el servicio de usuario
  ) {
    this.chatId = 0;
    this.messages = [];
    this.users = [];
    this.newMessage = "";
    this.message = {
      id: 0,
      information: "",
      chat_id: null,
      user_id: null,
    };
  }

  ngOnInit() {
    this.userData = this.localStorageService.getUserData();
    if (this.userData) {
      console.log(this.userData);
    }

    this.route.params.subscribe((params) => {
      this.chatId = params["id"];
      this.webSocketService.joinChat(this.chatId);
    });

    this.webSocketService.newMessage.subscribe((message: Message) => {
      this.messages.push(message);
    });

    this.webSocketService.updateMessage.subscribe((message: Message) => {
      const index = this.messages.findIndex((m) => m.id === message.id);
      if (index !== -1) {
        this.messages[index] = message;
      }
    });

    this.webSocketService.deleteMessage.subscribe((message: any) => {
      this.messages = this.messages.filter((m) => m.id !== message.id);
    });

    this.webSocketService.viewChat(this.chatId).subscribe((response) => {
      console.log(JSON.stringify(response["messages"]));
      this.messages = response["messages"];
    });

    this.loadUsers();
  }

  ngOnDestroy() {
    this.webSocketService.leaveChat(this.chatId);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = {
        information: this.newMessage,
        user_id: this.userData._id,
        chat_id: this.chatId,
      };

      console.log(JSON.stringify(message));

      this.webSocketService.sendMessage(this.chatId, message);
      this.storeMessage();
      this.newMessage = "";
    }
  }

  loadUsers() {
    this.userService.list().subscribe((data) => {
      this.users = data;
      console.log(JSON.stringify(this.users));
    });
  }

  storeMessage() {
    this.message.information = this.newMessage;
    this.message.chat_id = this.chatId;
    this.message.user_id = this.userData._id;

    this.webSocketService.create(this.message).subscribe((response) => {});
  }

  // Método para formatear la fecha
  formatMessageTime(time: string): string {
    return this.datePipe.transform(time, "short"); // 'short' podría ser 'medium', 'long', 'full' según tus preferencias
  }

  // Método para obtener el nombre del usuario según su ID
  getUserName(userId: string): string {
    if (!this.users) {
      console.error("Lista de usuarios no cargada.");
      return "Unknown User";
    }

    const user = this.users.find((u) => u._id === userId);
    return user ? user.name : "Unknown User";
  }
}

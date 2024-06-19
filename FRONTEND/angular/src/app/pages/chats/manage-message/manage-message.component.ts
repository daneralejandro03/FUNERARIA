import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Message } from "src/app/models/message.model";
import { User } from "src/app/models/user.model";
import { LocalStorageServiceService } from "src/app/services/local-storage-service.service";
import { WebSocketService } from "src/app/services/web-socket.service";

@Component({
  selector: "app-manage-message",
  templateUrl: "./manage-message.component.html",
  styleUrls: ["./manage-message.component.scss"],
})
export class ManageMessageComponent implements OnInit, OnDestroy {
  chatId: number;
  messages: Message[];
  message: Message;
  userData: User;
  newMessage: string;

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageServiceService
  ) {
    this.chatId = 0;
    this.messages = [];
    this.newMessage = "";
    this.message={
      id: 0,
      information: "",
      chat_id: null,
      user_id: null
    }
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

    this.webSocketService.viewChat(this.chatId).subscribe(response=>{
      console.log(JSON.stringify(response["messages"]));
      this.messages = response["messages"];
      
    })
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

  storeMessage(){
    this.message.information = this.newMessage;
    this.message.chat_id = this.chatId;
    this.message.user_id = this.userData._id;

    this.webSocketService.create(this.message).subscribe(response =>{
      
    })
  }
}

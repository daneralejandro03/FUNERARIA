import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatsRoutingModule } from "./chats-routing.module";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManageMessageComponent } from './manage-message/manage-message.component';

@NgModule({
  declarations: [ListComponent, ManageComponent, ManageMessageComponent],
  imports: [CommonModule, ChatsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ChatsModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { ManageMessageComponent } from "./manage-message/manage-message.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: ManageComponent,
  },
  {
    path: "update/:id",
    component: ManageComponent,
  },
  {
    path: "view/:id",
    component: ManageComponent,
  },
  {
    path: "manage-message/:id",
    component: ManageMessageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { ManageMatchComponent } from "./manage-match/manage-match.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "view/:id",
    component: ManageComponent,
  },
  {
    path: "assign/:id",
    component: ManageMatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { PaymentMethodComponent } from "./payment-method/payment-method.component";
import { ManageCreditCardComponent } from "./manage-credit-card/manage-credit-card.component";
import { ManageDaviplataComponent } from "./manage-daviplata/manage-daviplata.component";
import { ManagePseComponent } from "./manage-pse/manage-pse.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create/:subscription_id",
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
    path: "paymentmethod/:id",
    component: PaymentMethodComponent,
  },
  {
    path: "manage-credit-card/:id",
    component: ManageCreditCardComponent,
  },
  {
    path: "manage-daviplata/:id",
    component: ManageDaviplataComponent,
  },
  {
    path: "manage-pse/:id",
    component: ManagePseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaysRoutingModule {}

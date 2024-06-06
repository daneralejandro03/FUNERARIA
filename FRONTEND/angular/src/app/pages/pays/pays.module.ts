import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PaysRoutingModule } from "./pays-routing.module";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { ManageCreditCardComponent } from "./manage-credit-card/manage-credit-card.component";
import { ManageDaviplataComponent } from "./manage-daviplata/manage-daviplata.component";
import { ManagePseComponent } from "./manage-pse/manage-pse.component";
import { PaymentMethodComponent } from "./payment-method/payment-method.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ListComponent,
    ManageComponent,
    ManageCreditCardComponent,
    ManageDaviplataComponent,
    ManagePseComponent,
    PaymentMethodComponent,
  ],
  imports: [CommonModule, PaysRoutingModule, FormsModule, ReactiveFormsModule],
})
export class PaysModule {}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "src/app/models/subscription.model";
import { SubscriptionService } from "src/app/services/subscription.service";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  subscriptions: Subscription[];
  subscriptionsAux: Subscription[];
  customer: number;

  constructor(
    private service: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let customerId = params["customerId"];
      this.list(customerId);
    });
  }

  list(customerId: number) {
    this.customerService.view(customerId).subscribe((data) => {
      this.customer = customerId;
      console.log(data);

      this.subscriptions = data["subscriptions"];
      this.subscriptionsAux = [];

      for (let subscription of this.subscriptions) {
        this.service.view(subscription.id).subscribe((subscriptionData) => {
          this.subscriptionsAux.push(subscriptionData);
        });
      }

      console.log(JSON.stringify(this.subscriptions));
    });
  }

  view(id: number) {
    this.router.navigate(["subscriptions/view/" + id]);
  }

  create(customerId) {
    this.router.navigate(["subscriptions/create/" + customerId]);
  }

  update(id: number) {
    this.router.navigate(["subscriptions/update/" + id]);
  }

  listPays(id: number) {
    this.router.navigate(["pays/list/"], {
      queryParams: { subscription_id: id },
    });
  }

  delete(id: number) {
    console.log("Eliminando a: " + id);
    Swal.fire({
      title: "Eliminar",
      text: "Está seguro que quiere eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El registro ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}

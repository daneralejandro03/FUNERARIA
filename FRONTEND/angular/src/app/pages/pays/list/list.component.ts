import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, forkJoin, map, mergeMap, throwError } from "rxjs";
import { Pay } from "src/app/models/pay.model";
import { PayService } from "src/app/services/pay.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  pays: Pay[];
  paysAux: Pay[];
  subscription: number;

  constructor(
    private service: PayService,
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService
  ) {
    this.pays = [];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let subscription_id = params["subscription_id"];
      this.list(subscription_id);
    });
  }

  list(subscription_id: number) {
    // Primero, obtenemos la información del suscriptor del microservicio de negocio
    this.subscriptionService
      .view(subscription_id)
      .pipe(
        catchError((error) => {
          console.error("Error retrieving subscription:", error);
          return throwError("Error retrieving subscription");
        }),
        mergeMap((subscription) => {
          console.log("Subscription:", subscription);
          // Utilizamos la información del suscriptor para obtener todos los pagos del microservicio de pagos
          return this.service
            .list()
            .pipe(
              map((pays) =>
                pays.filter((pay) => pay.subscription_id === subscription_id)
              )
            );
        }),
        catchError((error) => {
          console.error("Error retrieving payments:", error);
          return throwError("Error retrieving payments");
        })
      )
      .subscribe((pays) => {
        console.log("Payments:", pays);
        this.pays = pays;
      });
    this.subscription = subscription_id;
  }

  view(id: number) {
    this.router.navigate(["pays/view/" + id]);
  }

  create(id: number) {
    console.log("Creando a: " + id);
    this.router.navigate(["pays/paymentmethod", id]); // Asegúrate de que la ruta es correcta
    console.log("Navegando a: " + id);
  }

  update(id: number) {
    this.router.navigate(["pays/update/" + id]);
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

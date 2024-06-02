import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Site } from "src/app/models/site.model";
import { WakeRoom } from "src/app/models/wake-room.model";
import { SiteService } from "src/app/services/site.service";
import { WakeRoomsService } from "src/app/services/wake-rooms.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  wakerooms: WakeRoom[];
  wakeroomsAux: WakeRoom[];
  site: number;
  constructor(
    private service: WakeRoomsService,
    private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.wakerooms = [];
    this.wakeroomsAux = [];
    this.site = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.site = params["site_id"];
    });

    this.route.queryParams.subscribe((queryParams) => {
      console.log("Query Params:", queryParams);
    });
  }

  list(customerId: number) {
    this.siteService.view(customerId).subscribe((data) => {
      this.site = customerId;
      console.log(data);

      this.wakerooms = data["subscriptions"];
      this.wakeroomsAux = [];

      for (let subscription of this.wakerooms) {
        this.service.view(subscription.id).subscribe((subscriptionData) => {
          this.wakeroomsAux.push(subscriptionData);
        });
      }

      console.log(JSON.stringify(this.wakerooms));
    });
  }

  view(id: number) {
    console.log(id);
    this.router.navigate(["wakerooms/view/" + id]);
  }

  create(siteId: number) {
    this.router.navigate(["wakerooms/create/" + siteId]);
  }

  update(id: number) {
    this.router.navigate(["wakerooms/update/" + id]);
  }

  delete(id: number): void {
    console.log(id);
    Swal.fire({
      title: "Eliminar",
      text: "Está seguro que quiere eliminar la Sala?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El registro se ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}

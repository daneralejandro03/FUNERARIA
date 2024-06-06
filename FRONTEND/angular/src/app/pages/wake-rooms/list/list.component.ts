import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    this.route.queryParams.subscribe((params) => {
      this.site = params["site_id"];
      if (this.site) {
        this.list(this.site); // Llama al método list cuando se recibe el site_id
      } else {
        console.error("El parámetro site_id es undefined.");
      }
    });

    this.route.queryParams.subscribe((queryParams) => {
      console.log("Query Params:", queryParams);
    });
  }

  list(id: number) {
    console.log("ID recibido en list():", id);
    this.siteService.view(id).subscribe((data) => {
      console.log(data);

      this.wakerooms = data["wakeRoom"];
      this.wakeroomsAux = [];

      for (let wakeroom of this.wakerooms) {
        this.service.view(wakeroom.id).subscribe((wakeroomData) => {
          this.wakeroomsAux.push(wakeroomData);
        });
      }

      // Mover la asignación de this.site aquí después de recibir los datos
      this.site = id;
      console.log(JSON.stringify(this.wakerooms));
    });
  }

  view(id: number) {
    console.log(id);
    this.router.navigate(["wakerooms/view/" + id]);
  }

  create(id: number) {
    this.router.navigate(["wakerooms/create/" + id]);
    this.list(id); // Actualiza la lista después de navegar a la página de creación
  }

  update(id: number) {
    this.router.navigate(["wakerooms/update/" + id]);
    this.list(this.site); // Actualiza la lista después de navegar a la página de actualización
  }

  navigateToCremations(id: number) {
    console.log("LLEGO HASTA ACA");

    this.router.navigate(["cremations/list/"], {
      queryParams: { wake_room_id: id },
    });
  }

  navigateToBurials(id: number) {
    console.log("LLEGO HASTA ACA");

    this.router.navigate(["burials/list/"], {
      queryParams: { wake_room_id: id },
    });
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
          this.ngOnInit(); // Recarga los datos después de eliminar una sala
        });
      }
    });
  }
}

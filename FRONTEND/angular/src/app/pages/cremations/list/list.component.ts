import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cremation } from "src/app/models/cremation.model";
import { CremationService } from "src/app/services/cremation.service";
import { ServiceService } from "src/app/services/service.service";
import { WakeRoomsService } from "src/app/services/wake-rooms.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  cremations: Cremation[];
  cremationsAux: Cremation[];
  wakeroom: number;

  constructor(
    private service: CremationService,
    private wakeroomsService: WakeRoomsService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {
    this.cremations = [];
    this.cremationsAux = [];
    this.wakeroom = 0;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.wakeroom = params["wake_room_id"];
      if (this.wakeroom) {
        this.list(this.wakeroom); // Llama al método list cuando se recibe el site_id
      } else {
        console.error("El parámetro site_id es undefined.");
      }
    });

    this.route.queryParams.subscribe((queryParams) => {
      console.log("Query Params:", queryParams);
    });
    this.list(this.wakeroom);
  }

  list(id: number) {
    console.log("ID recibido en list():", id);
    this.wakeroomsService.view(id).subscribe((data) => {
      console.log(data);

      this.cremations = data["cremations"];
      this.cremationsAux = [];

      for (let cremation of this.cremations) {
        this.service.view(cremation.id).subscribe((cremationData) => {
          this.cremationsAux.push(cremationData);
        });
      }

      // Mover la asignación de this.wakeroom aquí después de recibir los datos
      this.wakeroom = id;
      console.log(JSON.stringify(this.cremations));
    });
  }

  view(id: number) {
    console.log(id);
    this.router.navigate(["cremations/view/" + id]);
  }

  create(id: number) {
    this.router.navigate(["cremations/create/" + id]);
    this.list(id); // Actualiza la lista después de navegar a la página de creación
  }

  update(id: number) {
    this.router.navigate(["cremations/update/" + id]);
    this.list(this.wakeroom); // Actualiza la lista después de navegar a la página de actualización
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
        this.service.view(id).subscribe((data) => {
          let service_id = data.service_id;
          console.log("ServiceId: " + service_id);

          this.service.delete(id).subscribe((data) => {
            this.serviceService.delete(service_id).subscribe((data) => {
              Swal.fire(
                "Eliminado!",
                "El registro ha sido eliminada correctamente",
                "success"
              );
            });

            this.ngOnInit();
          });
        });
      }
    });
  }
}

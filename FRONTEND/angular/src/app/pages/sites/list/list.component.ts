import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Site } from "src/app/models/site.model";
import { SiteService } from "src/app/services/site.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  sites: Site[]; // This is the array that will store the theaters

  constructor(private service: SiteService, private router: Router) {
    this.sites = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.sites = data;
      console.log(JSON.stringify(this.sites));
    });
  }

  view(id: number) {
    console.log(id);
    this.router.navigate(["sites/view/" + id]);
  }

  create() {
    this.router.navigate(["sites/create"]);
  }

  update(id: number) {
    this.router.navigate(["sites/update/" + id]);
  }

  delete(id: number): void {
    console.log(id);
    Swal.fire({
      title: "Eliminar",
      text: "Está seguro que quiere eliminar el sitio?",
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

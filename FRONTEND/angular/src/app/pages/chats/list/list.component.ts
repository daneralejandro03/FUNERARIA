import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Chat } from "src/app/models/chat.model";
import { ChatService } from "src/app/services/chat.service";
import { IncidentService } from "src/app/services/incident.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  chats: Chat[];

  constructor(private service: ChatService, private router: Router) {
    this.chats = [];
  }

  ngOnInit(): void {
    this.loadChats();
  }

  loadChats() {
    this.service.list().subscribe((data) => {
      this.chats = data;
      console.log(JSON.stringify(this.chats));
    });
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

  create() {
    this.router.navigate(["chats/create"]);
  }

  update(id: number) {
    console.log(id);
    this.router.navigate(["chats/update/" + id]);
  }

  view(id: number) {
    console.log(id);
    this.router.navigate(["chats/view/" + id]);
  }

  messages(id: number) {
    console.log(id);
    this.router.navigate(["chats/manage-message/" + id]);
  }
}

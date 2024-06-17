import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  user: User;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.user = {
      _id: "",
      name: "",
      identificationCard: "",
      email: "",
    };
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    const currentURL = this.activeRoute.snapshot.url.join("/");

    if (currentURL.includes("view")) {
      this.mode = 1;
    }

    if (this.activeRoute.snapshot.params.id) {
      this.user._id = this.activeRoute.snapshot.params.id;
      this.getUser(this.user._id);
    }
  }

  getUser(id: string) {
    this.service.view(id).subscribe((data) => {
      this.user = data;
      console.log("Permission -> " + JSON.stringify(this.user));
      // Llenar el formulario con los datos obtenidos del servidor
      this.theFormGroup.patchValue({
        name: this.user.name,
        identificationCard: this.user.identificationCard,
        email: this.user.email,
      });
    });
  }
}

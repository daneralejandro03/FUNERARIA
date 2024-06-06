import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.component.html",
  styleUrls: ["./payment-method.component.scss"],
})
export class PaymentMethodComponent implements OnInit {
  @Output() methodSelected = new EventEmitter<string>();
  subscriptionId: number; // Variable para almacenar el ID de la suscripción

  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscriptionId = 0;
  } // Inyecta ActivatedRoute y Router en el constructor

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.subscriptionId = +params["id"];
      console.log(`Subscription ID: ${this.subscriptionId}`);
    });
  }

  selectMethod(method: string) {
    switch (
      method // Utiliza un switch para determinar la ruta específica basada en el método seleccionado
    ) {
      case "Tarjeta de Crédito":
        this.router.navigate([
          `pays/manage-credit-card/${this.subscriptionId}`,
        ]); // Navega a la ruta de gestión de tarjeta de crédito con el ID de la suscripción
        break;
      case "Daviplata":
        this.router.navigate([`pays/manage-daviplata/${this.subscriptionId}`]); // Navega a la ruta de gestión de Daviplata con el ID de la suscripción
        break;
      case "PSE":
        this.router.navigate([`pays/manage-pse/${this.subscriptionId}`]); // Navega a la ruta de gestión de PSE con el ID de la suscripción
        break;
      default:
        break;
    }
  }
}

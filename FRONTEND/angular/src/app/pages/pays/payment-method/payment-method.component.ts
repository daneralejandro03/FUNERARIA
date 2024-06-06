import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.component.html",
  styleUrls: ["./payment-method.component.scss"],
})
export class PaymentMethodComponent implements OnInit {
  @Output() methodSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  selectMethod(method: string) {
    this.methodSelected.emit(method);
  }
}

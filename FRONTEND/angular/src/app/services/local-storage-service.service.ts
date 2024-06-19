import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageServiceService {
  constructor() {}

  getUserData() {
    const userData = localStorage.getItem("sesion");
    return userData ? JSON.parse(userData) : null;
  }
}

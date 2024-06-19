import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  theUser=new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient, private router: Router) { 
    this.verifyActualSession();
  }
  /**
    * Permite obtener la información de usuario
    * que tiene la función activa y servirá
    * para acceder a la información del token
*/
  public get activeUserSession(): User {
    return this.theUser.value;
  }
  /**
    * Permite actualizar la información del usuario
    * que acabó de validarse correctamente
    * @param user información del usuario logueado
  */
  setUser(user: User) {
    this.theUser.next(user);
  }
  /**
  * Permite obtener la información del usuario
  * con datos tales como el identificador y el token
  * @returns
  */
  getUser() {
    return this.theUser.asObservable();
  }
  /**
  * Realiza la petición al backend con el correo y la contraseña
  * para verificar si existe o no en la plataforma
  * @param infoUsuario JSON con la información de correo y contraseña
  * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
  */
  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/api/public/security/login`, user);
  }

  login2FA(session: Session): Observable<Session>{

    let ruta = `${environment.url_ms_security}/api/public/security/login/2FA/${session.user_id}`
    console.log(JSON.stringify(session.token2FA));

    return this.http.post<Session>(`${environment.url_ms_security}/api/public/security/login/2FA/${session.user_id}`, session);
  }

  forgotPassword(email: string): Observable<any>{
    return this.http.post<any>(`${environment.url_ms_security}/api/public/security/forgot-password`, {email: email})
  }

  resetPassword(token: string, newPassword: string): Observable<any>{
    return this.http.post<any>(`${environment.url_ms_security}/api/public/security/reset-password`, { token: token, newPassword: newPassword })
  }

  changePassword(email: string, password: string, newPassword: string): Observable<any>{
    return this.http.post<any>(`${environment.url_ms_security}/api/public/security/change-password`, { email: email, currentPassword: password, newPassword: newPassword })
  }

  getUserByEmail(email: string): Observable<any>{
    return this.http.get<any>(`${environment.url_ms_security}/api/public/security/user-by-email?email=${email}`)

  }

  sendContactMessage(subject: string, plainText: string): Observable<any>{
    return this.http.post<any>(`${environment.url_ms_security}/api/public/security/send-contact`, { subject: subject, plainText: plainText })
  }

  getUserId(email: string): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_security}/api/public/security/getUserId?email=${email}`);
  }
  
  /*
  Guardar la informacion de usuario en el local storage
  */
  saveSession(dataSesion: any) {
    let actualSession = localStorage.getItem('sesion');
    let data: User = {
      _id: dataSesion["user"]["_id"],
      name: dataSesion["user"]["name"],
      email: dataSesion["user"]["email"],
      password:"",
      token: dataSesion["token"]
      
    };
    localStorage.setItem('sesion', JSON.stringify(data));
    this.setUser(data);
  }
  /**
  * Permite cerrar la sesión del usuario
  * que estaba previamente logueado
  */
  logout() {
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }
  /**
  * Permite verificar si actualmente en el local storage
  * existe información de un usuario previamente logueado
  */
  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }
  /**
  * Verifica si hay una sesion activa
  * @returns
  */
  existSession(): boolean {
    let sesionActual = this.getSessionData();
    return (sesionActual) ? true : false;
  }
  /**
  * Permite obtener los dato de la sesión activa en el
  * local storage
  * @returns
  */
  getSessionData() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }
}

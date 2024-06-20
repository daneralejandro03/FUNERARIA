import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user.model";
import { SecurityService } from "src/app/services/security.service";
import { WebSocketService } from "src/app/services/web-socket.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  /*{ path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '2' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '2' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '2' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '1' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '2' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '0' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '0' },*/
  { path: "/login", title: "Login", icon: "ni-key-25 text-info", class: "0" },
  {
    path: "/administrators/list",
    title: "Administrators",
    icon: "ni-settings-gear-65 text-green",
    class: "1",
  },
  {
    path: "/customers/list",
    title: "Customers",
    icon: "ni-badge text-info",
    class: "1",
  },
  {
    path: "/employees/list",
    title: "Employees",
    icon: "ni-briefcase-24 text-red",
    class: "1",
  },
  {
    path: "/incidents/list",
    title: "Incidents",
    icon: "ni-ambulance text-primary",
    class: "1",
  },
  {
    path: "/owners/list",
    title: "Owners",
    icon: "ni-single-copy-04 text-warning",
    class: "1",
  },
  {
    path: "/permissions/list",
    title: "Permisos",
    icon: "ni-key-25 text-success",
    class: "1",
  },
  {
    path: "/plans/list",
    title: "Plans",
    icon: "ni-collection text-dark",
    class: "1",
  },
  {
    path: "/rolepermissions/list",
    title: "Roles - Permissions",
    icon: "ni-key-25 text-warning",
    class: "1",
  },
  {
    path: "/roles/list",
    title: "Roles",
    icon: "ni-hat-3 text-primary",
    class: "1",
  },
  {
    path: "/services/list",
    title: "Services",
    icon: "ni-support-16 text-success",
    class: "1",
  },
  {
    path: "/sites/list",
    title: "Sites",
    icon: "ni-building text-green",
    class: "1",
  },
  {
    path: "/transfers/list",
    title: "Transfers",
    icon: "ni-send text-danger",
    class: "1",
  },
  {
    path: "/chats/list",
    title: "Chats",
    icon: "ni-chat-round text-blue",
    class: "1",
  },
  {
    path: "/users/list",
    title: "Users",
    icon: "ni-single-02 text-primary",
    class: "1",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  theUser: User;
  subscription: Subscription;

  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private theSecurityService: SecurityService,
    private theWebSocketService: WebSocketService
  ) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.subscription = this.theSecurityService.getUser().subscribe((data) => {
      this.theUser = data;
    });
  }

  getTheSecutiryService() {
    return this.theSecurityService;
  }

  administradores() {
    this.router.navigate(["administrators/list/"]);
  }

  logout(){
    this.theSecurityService.logout();
  }
}

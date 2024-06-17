import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import * as path from "path";
import { AuthGuard } from "src/app/guards/auth.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  {
    path: "user-profile",
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "owners",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/owners/owners.module").then((m) => m.OwnersModule),
  },
  {
    path: "beneficiaries",
    loadChildren: () =>
      import("src/app/pages/beneficiaries/beneficiaries.module").then(
        (m) => m.BeneficiariesModule
      ),
  },
  {
    path: "customers",
    loadChildren: () =>
      import("src/app/pages/customers/customers.module").then(
        (m) => m.CustomersModule
      ),
  },
  {
    path: "subscriptions",
    loadChildren: () =>
      import("src/app/pages/subscriptions/subscriptions.module").then(
        (m) => m.SubscriptionsModule
      ),
  },
  {
    path: "plans",
    loadChildren: () =>
      import("src/app/pages/plans/plans.module").then((m) => m.PlansModule),
  },
  {
    path: "services",
    loadChildren: () =>
      import("src/app/pages/services/services.module").then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: "administrators",
    loadChildren: () =>
      import("src/app/pages/administrators/administrators.module").then(
        (m) => m.AdministratorsModule
      ),
  },
  {
    path: "employees",
    loadChildren: () =>
      import("src/app/pages/employees/employees.module").then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: "pays",
    loadChildren: () =>
      import("src/app/pages/pays/pays.module").then((m) => m.PaysModule),
  },
  {
    path: "sites",
    loadChildren: () =>
      import("src/app/pages/sites/sites.module").then((m) => m.SitesModule),
  },
  {
    path: "serviceplans",
    loadChildren: () =>
      import("src/app/pages/serviceplans/serviceplans.module").then(
        (m) => m.ServiceplansModule
      ),
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("src/app/pages/notifications/notifications.module").then(
        (m) => m.NotificationsModule
      ),
  },
  {
    path: "transfers",
    loadChildren: () =>
      import("src/app/pages/transfers/transfers.module").then(
        (m) => m.TransfersModule
      ),
  },
  {
    path: "incidents",
    loadChildren: () =>
      import("src/app/pages/incidents/incidents.module").then(
        (m) => m.IncidentsModule
      ),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("src/app/pages/reports/reports.module").then(
        (m) => m.ReportsModule
      ),
  },
  {
    path: "wakerooms",
    loadChildren: () =>
      import("src/app/pages/wake-rooms/wake-rooms.module").then(
        (m) => m.WakeRoomsModule
      ),
  },
  {
    path: "executionservices",
    loadChildren: () =>
      import("src/app/pages/executionservices/executionservices.module").then(
        (m) => m.ExecutionservicesModule
      ),
  },
  {
    path: "cremations",
    loadChildren: () =>
      import("src/app/pages/cremations/cremations.module").then(
        (m) => m.CremationsModule
      ),
  },
  {
    path: "burials",
    loadChildren: () =>
      import("src/app/pages/burials/burials.module").then(
        (m) => m.BurialsModule
      ),
  },
  {
    path: "comments",
    loadChildren: () =>
      import("src/app/pages/comments/comments.module").then(
        (m) => m.CommentsModule
      ),
  },
  {
    path: "deceaseds",
    loadChildren: () =>
      import("src/app/pages/deceaseds/deceaseds.module").then(
        (m) => m.DeceasedsModule
      ),
  },
  {
    path: "permissions",
    loadChildren: () =>
      import("src/app/pages/permissions/permissions.module").then(
        (m) => m.PermissionsModule
      ),
  },
  {
    path: "users",
    loadChildren: () =>
      import("src/app/pages/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "roles",
    loadChildren: () =>
      import("src/app/pages/roles/roles.module").then((m) => m.RolesModule),
  },
  {
    path: "rolepermissions",
    loadChildren: () =>
      import("src/app/pages/role-permission/role-permission.module").then(
        (m) => m.RolePermissionModule
      ),
  },
];

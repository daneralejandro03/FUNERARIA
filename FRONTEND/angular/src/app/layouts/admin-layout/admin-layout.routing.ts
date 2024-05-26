import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { 
      path: 'owners',
      loadChildren: () => import('src/app/pages/owners/owners.module').then(m => m.OwnersModule)
    },
    {
      path: 'beneficiaries',
      loadChildren: () => import('src/app/pages/beneficiaries/beneficiaries.module').then(m => m.BeneficiariesModule)
    },
    {
      path: 'customers',
      loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)
    },
    {
      path: 'subscriptions',
      loadChildren: () => import('src/app/pages/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
    },
    {
      path: 'plans',
      loadChildren: () => import('src/app/pages/plans/plans.module').then(m => m.PlansModule)
    },
    {
      path: 'services',
      loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
    },
    {
      path: 'administrators',
      loadChildren: () => import('src/app/pages/administrators/administrators.module').then(m => m.AdministratorsModule)
    },
    {
      path: 'employees',
      loadChildren: () => import('src/app/pages/employees/employees.module').then(m => m.EmployeesModule)
    },
    {
      path: 'pays',
      loadChildren: () => import('src/app/pages/pays/pays.module').then(m => m.PaysModule)
    }
];

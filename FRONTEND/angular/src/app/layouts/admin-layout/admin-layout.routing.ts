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
    }
];

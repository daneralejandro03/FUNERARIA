import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolePermissionListComponent } from './list/list.component';
import { RolePermissionManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: 'list',
    component: RolePermissionListComponent
  },
  {
    path: 'create',
    component: RolePermissionManageComponent
  },
  {
    path: 'update/:id',
    component: RolePermissionManageComponent
  },
  {
    path: 'view/:id',
    component: RolePermissionManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolePermissionRoutingModule { }

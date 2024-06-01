import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionRoutingModule } from './role-permission-routing.module';
import { RolePermissionListComponent } from './list/list.component';
import { RolePermissionManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RolePermissionListComponent,
    RolePermissionManageComponent
  ],
  imports: [
    CommonModule,
    RolePermissionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RolePermissionModule { }

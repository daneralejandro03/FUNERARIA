import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permissions-routing.module';
import { PermissionListComponent } from './list/list.component';
import { PermissionManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PermissionListComponent,
    PermissionManageComponent
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PermissionsModule { }

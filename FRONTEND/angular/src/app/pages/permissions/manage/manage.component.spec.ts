import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionManageComponent } from './manage.component';

describe('ManageComponent', () => {
  let component: PermissionManageComponent;
  let fixture: ComponentFixture<PermissionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

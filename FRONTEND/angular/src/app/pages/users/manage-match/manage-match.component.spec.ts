import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMatchComponent } from './manage-match.component';

describe('ManageMatchComponent', () => {
  let component: ManageMatchComponent;
  let fixture: ComponentFixture<ManageMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

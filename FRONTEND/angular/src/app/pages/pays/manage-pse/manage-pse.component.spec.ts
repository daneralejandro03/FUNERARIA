import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePseComponent } from './manage-pse.component';

describe('ManagePseComponent', () => {
  let component: ManagePseComponent;
  let fixture: ComponentFixture<ManagePseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

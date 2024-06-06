import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDaviplataComponent } from './manage-daviplata.component';

describe('ManageDaviplataComponent', () => {
  let component: ManageDaviplataComponent;
  let fixture: ComponentFixture<ManageDaviplataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDaviplataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDaviplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

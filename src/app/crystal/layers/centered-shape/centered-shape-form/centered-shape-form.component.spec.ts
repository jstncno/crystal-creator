import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredShapeFormComponent } from './centered-shape-form.component';

describe('CenteredShapeFormComponent', () => {
  let component: CenteredShapeFormComponent;
  let fixture: ComponentFixture<CenteredShapeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenteredShapeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenteredShapeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

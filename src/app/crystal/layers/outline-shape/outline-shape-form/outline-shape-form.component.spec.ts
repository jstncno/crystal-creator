import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlineShapeFormComponent } from './outline-shape-form.component';

describe('OutlineShapeFormComponent', () => {
  let component: OutlineShapeFormComponent;
  let fixture: ComponentFixture<OutlineShapeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlineShapeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlineShapeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RingOfShapesFormComponent } from './ring-of-shapes-form.component';

describe('RingOfShapesFormComponent', () => {
  let component: RingOfShapesFormComponent;
  let fixture: ComponentFixture<RingOfShapesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RingOfShapesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RingOfShapesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

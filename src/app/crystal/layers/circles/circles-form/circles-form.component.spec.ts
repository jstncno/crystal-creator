import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclesFormComponent } from './circles-form.component';

describe('CirclesFormComponent', () => {
  let component: CirclesFormComponent;
  let fixture: ComponentFixture<CirclesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirclesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesFormComponent } from './lines-form.component';

describe('LinesFormComponent', () => {
  let component: LinesFormComponent;
  let fixture: ComponentFixture<LinesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

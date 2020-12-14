import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DottedLinesFormComponent } from './dotted-lines-form.component';

describe('DottedLinesFormComponent', () => {
  let component: DottedLinesFormComponent;
  let fixture: ComponentFixture<DottedLinesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DottedLinesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DottedLinesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

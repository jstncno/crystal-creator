import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteppedHexagonsFormComponent } from './stepped-hexagons-form.component';

describe('SteppedHexagonsFormComponent', () => {
  let component: SteppedHexagonsFormComponent;
  let fixture: ComponentFixture<SteppedHexagonsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteppedHexagonsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteppedHexagonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

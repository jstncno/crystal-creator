import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteFormComponent } from './color-palette-form.component';

describe('ColorPaletteFormComponent', () => {
  let component: ColorPaletteFormComponent;
  let fixture: ComponentFixture<ColorPaletteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

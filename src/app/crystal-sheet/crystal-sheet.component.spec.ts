import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrystalSheetComponent } from './crystal-sheet.component';

describe('CrystalSheetComponent', () => {
  let component: CrystalSheetComponent;
  let fixture: ComponentFixture<CrystalSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrystalSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrystalSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

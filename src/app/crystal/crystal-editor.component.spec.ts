import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrystalEditorComponent } from './crystal-editor.component';

describe('CrystalEditorComponent', () => {
  let component: CrystalEditorComponent;
  let fixture: ComponentFixture<CrystalEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrystalEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrystalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

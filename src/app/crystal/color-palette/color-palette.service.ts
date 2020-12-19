import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const INITIAL_PALETTE: string[] = [
  '#694873', // English Violet
  '#3374AB', // Spanish Blue
];

@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService {

  private colorsSub = new BehaviorSubject<string[]>([...INITIAL_PALETTE]);
  colorPalette$ = this.colorsSub.asObservable();

  constructor() { }

  addColor(color: string) {
    const colors = this.colorsSub.getValue();
    colors.push(color);
    this.colorsSub.next(colors);
  }

  setColors(colors: string[]) {
    this.colorsSub.next(colors);
  }

  removeColor(index: number) {
    const colors = this.colorsSub.getValue();
    if (index < 0 || index >= colors.length) return;
    colors.splice(index, 1);
    this.setColors(colors);
  }
}

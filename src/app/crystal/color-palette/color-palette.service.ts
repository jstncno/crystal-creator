import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService {

  private colorsSub = new BehaviorSubject<string[]>([]);
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

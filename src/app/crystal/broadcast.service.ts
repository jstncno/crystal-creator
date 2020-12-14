import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  onDraw = new Subject<void>();
  onDraw$ = this.onDraw.asObservable();

  constructor() { }
}

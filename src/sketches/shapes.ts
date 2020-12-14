import * as p5 from 'p5';

import {pointOnCircle} from './utils';

export function hexagon(p5: p5, x: number, y: number, radius: number) {
  polygon(p5, 6, x, y, radius);
}

export function polygon(p5: p5, n: number, x: number, y: number, r: number, angleOffset: number = 0) {
  const angle = 360 / n;
  p5.beginShape();
  for (let i = 0; i < n; i++) {
    var nextX = x + p5.cos(i * angle + angleOffset) * r;
    var nextY = y + p5.sin(i * angle + angleOffset) * r;
    p5.vertex(nextX, nextY)
  }
  p5.endShape(p5.CLOSE);
}

export function drawShape(p5: p5, n: number, x: number, y: number, r: number, angleOffset: number = 0) {
  if (!n) p5.ellipse(x, y, r, r);
  else polygon(p5, n, x, y, r, angleOffset);
}

import * as p5 from 'p5';

export function coinFlip(p5: p5): boolean {
  return p5.random([true, false]);
}

export function getColor(sketch: p5, param: number[]|string): p5.Color {
  if (Array.isArray(param)) {
    return sketch.color(param);
  } else if (typeof(param) === 'string') {
    return sketch.color(param);
  }
  return sketch.color(param);
}

export function pointOnCircle(p5: p5, x: number, y: number, radius: number, angle: number) {
  const posX = x + radius * p5.cos(angle);
  const posY = y + radius * p5.sin(angle);
  return p5.createVector(posX, posY);
}

export function chooseOne(sketch: p5, choices: any[]) {
  const idx = sketch.floor(sketch.random(choices.length));
  return choices[idx];
}

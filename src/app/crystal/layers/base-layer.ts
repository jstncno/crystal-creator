import * as p5 from 'p5';

export interface Layer {
  name: string;
  sides: number;
  strokeColor?: string;
  strokeWeight?: number;
  fillColor?: string;
  size: number;
}

export interface RenderableLayer extends Layer {
  render: (sketch: p5) => void;
}

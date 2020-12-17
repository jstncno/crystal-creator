
import { Layer, RenderableLayer } from '@crystal-creator/crystal/layers/base-layer';
import { CenteredShapeLayer, CenteredShape } from '@crystal-creator/crystal/layers/centered-shape/centered-shape';
import { CirclesLayer, Circles } from '@crystal-creator/crystal/layers/circles/circles';
import { DottedLinesLayer, DottedLines, LinesLayer, Lines } from '@crystal-creator/crystal/layers/lines/lines';
import { OutlineShapeLayer, OutlineShape } from '@crystal-creator/crystal/layers/outline-shape/outline-shape';
import { RingOfShapesLayer, RingOfShapes } from '@crystal-creator/crystal/layers/ring-of-shapes/ring-of-shapes';
import { SteppedHexagonsLayer, SteppedHexagons } from '@crystal-creator/crystal/layers/stepped-hexagons/stepped-hexagons';

export type SupportedLayer = Layer
  | CenteredShapeLayer
  | CirclesLayer
  | DottedLinesLayer
  | LinesLayer
  | OutlineShapeLayer
  | RingOfShapesLayer
  | SteppedHexagonsLayer;

export function createRenderableLayer(params: SupportedLayer): RenderableLayer {
  let layer: RenderableLayer;
  switch (params.name) {
    case 'centered-shape':
      layer = new CenteredShape(params);
      break;
    case 'circles':
      layer = new Circles(params);
      break;
    case 'lines':
      layer = new Lines(params);
      break;
    case 'dotted-lines':
      layer = new DottedLines(params);
      break;
    case 'outline-shape':
      layer = new OutlineShape(params as OutlineShapeLayer);
      break;
    case 'ring-of-shapes':
      layer = new RingOfShapes(params);
      break;
    case 'stepped-hexagons':
    default:
      layer = new SteppedHexagons(params);
      break;
  }
  return layer;
}

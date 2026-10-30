export type Viewport = { x: number; y: number; scale: number };
export type Point = { x: number; y: number };

export function zoomViewport(view: Viewport, requested: number, anchor: Point): Viewport {
  const scale = Math.min(2, Math.max(0.03, requested));
  const ratio = scale / view.scale;
  return { x: anchor.x - (anchor.x - view.x) * ratio, y: anchor.y - (anchor.y - view.y) * ratio, scale };
}

export function fitViewport(width: number, height: number, sceneWidth: number, sceneHeight: number): Viewport {
  const scale = Math.min(1, Math.max(0.03, Math.min((width - 80) / sceneWidth, (height - 80) / sceneHeight)));
  return { x: (width - sceneWidth * scale) / 2, y: (height - sceneHeight * scale) / 2, scale };
}

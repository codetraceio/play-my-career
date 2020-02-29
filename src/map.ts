import * as pixi from "pixi.js";

export const map = new Map();

function getKey(x: number, y: number) {
  return `${x}-${y}`;
}

export function addToMap(x: number, y: number, sprite: pixi.Sprite) {
  map.set(getKey(x, y), sprite);
}

export function deleteFromMap(x: number, y: number) {
  map.delete(getKey(x, y));
}

export function mapHas(x: number, y: number) {
  map.has(getKey(x, y));
}

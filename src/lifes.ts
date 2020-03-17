import Phaser from "phaser";
import { sprites } from "./sprites";

const maxLifes = 3;
let lifeCount = 3;
const lifes: Phaser.GameObjects.Sprite[] = [];

function createLife(scene: Phaser.Scene, position: number) {
  const space = 12;
  return scene.add.sprite(32 + 32 * (position + 1) + position * space, 32, sprites.coffee).setScrollFactor(0, 0).setDepth(100);
}

export function createLifes(scene: Phaser.Scene) {
  for (let i = 0; i < maxLifes; i++) {
    const life = createLife(scene, i);
    lifes.push(life);
  }
}

export function setLifes(count: number) {
  for (let i = 0; i < maxLifes; i++) {
    lifes[i].setAlpha(i < count ? 1 : 0);
  }
  lifeCount = count <= maxLifes ? count : maxLifes;
}

export function removeLife() {
  return setLifes(lifeCount - 1);
}

export function addLife() {
  if (lifeCount === maxLifes) {
    return;
  }
  return setLifes(lifeCount + 1);
}

export function getLifes() {
  return lifeCount;
}

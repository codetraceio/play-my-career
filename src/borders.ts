import { IState } from "./state";
import { createTail } from "./tail";
import { sprites } from "./sprites";

export function createBorders(scene: Phaser.Scene,  horizontalCount: number, verticalCount: number) {
  for (let i = 0; i < verticalCount; i++) {
    createTail(scene, sprites.tailBrick, 0, i);
    createTail(scene, sprites.tailBrick, horizontalCount - 1, i);
  }
  for (let i = 0; i < horizontalCount; i++) {
    createTail(scene, sprites.tailBrick, i, verticalCount - 1);
  }
}

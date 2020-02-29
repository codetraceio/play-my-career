import { IState } from "./state";
import { createTail } from "./tail";

export function createBorders(scene: Phaser.Scene,  horizontalCount: number, verticalCount: number) {
  for (let i = 0; i < verticalCount; i++) {
    createTail(scene, 0, i);
    createTail(scene, horizontalCount - 1, i);
  }
  for (let i = 0; i < horizontalCount; i++) {
    createTail(scene, i, verticalCount - 1);
  }
}

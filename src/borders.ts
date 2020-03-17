import { IState } from "./state";
import { createTail } from "./tail";
import { sprites } from "./sprites";

export function createBorders(platforms: Phaser.Physics.Arcade.StaticGroup,  horizontalCount: number, verticalCount: number) {
  for (let i = 0; i < verticalCount; i++) {
    createTail(platforms, sprites.tailBrick, 0, i);
    createTail(platforms, sprites.tailBrick, horizontalCount - 1, i);
  }
  for (let i = 0; i < horizontalCount; i++) {
    createTail(platforms, sprites.tailBrick, i, verticalCount - 1);
  }
}

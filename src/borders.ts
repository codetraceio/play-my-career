import { IState } from "./state";
import { createTail } from "./tail";
import { sprites } from "./sprites";
import { IScene } from "./interfaces/IScene";

export function createBorders(scene: IScene, platformCategory: number,  horizontalCount: number, verticalCount: number) {
  for (let i = 0; i < verticalCount; i++) {
    createTail(scene, platformCategory, sprites.tailBrick, 0, i);
    createTail(scene, platformCategory, sprites.tailBrick, horizontalCount - 1, i);
  }
  for (let i = 0; i < horizontalCount; i++) {
    createTail(scene, platformCategory, sprites.tailBrick, i, verticalCount - 1);
  }
}

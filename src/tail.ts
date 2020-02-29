import * as Phaser from "phaser";
import { sprites } from "./sprites";
import { config } from "./config";
import { IState, state } from "./state";

export function createTail(scene: Phaser.Scene, x: number, y: number) {
  const size = config.tailSize;
  return (
    state.platforms
    .create(size / 2 + x * size, size / 2 + y * size, sprites.tailGroundGrass)
    .setSize(size, size)
    .setDisplaySize(size, size)
  );
}

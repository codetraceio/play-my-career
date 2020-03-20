import * as Phaser from "phaser";
import { config } from "./config";

export function createTail(
  group: Phaser.Physics.Arcade.StaticGroup,
  sprite: string,
  x: number,
  y: number,
  halfHeight: boolean = false,
  frame: number = 0,
): Phaser.Physics.Arcade.Sprite {
  const size = config.tailSize;
  const height = halfHeight ? size / 2 : size;
  const yPosition = halfHeight ? size / 2 + height / 2 + y * size : size / 2 + y * size;
  return (
    group
    .create(size / 2 + x * size, yPosition, sprite, frame)
    .setSize(size, height)
    .setDisplaySize(size, height)
    .setDepth(1)
  );
}

export function createPlatform(group: Phaser.Physics.Arcade.StaticGroup, sprite: string, x: number, y: number, isSurface: boolean = false) {
  const tail = createTail(group, sprite, x, y);
  tail.setFrame(isSurface ? 1 : 0);
  return tail;
}
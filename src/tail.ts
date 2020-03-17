import * as Phaser from "phaser";
import { config } from "./config";

export function createTail(platforms: Phaser.Physics.Arcade.StaticGroup, tail: string, x: number, y: number, halfHeight: boolean = false): Phaser.Physics.Arcade.Sprite {
  const size = config.tailSize;
  const height = halfHeight ? size / 2 : size;
  const yPosition = halfHeight ? size / 2 + height / 2 + y * size : size / 2 + y * size;
  return (
    platforms
    .create(size / 2 + x * size, yPosition, tail)
    .setSize(size, height)
    .setDisplaySize(size, height)
    .setDepth(1)
  );
}

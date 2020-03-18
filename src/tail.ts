import * as Phaser from "phaser";
import { config } from "./config";
import { IScene } from "./interfaces/IScene";

export function createTail(scene: IScene, platformCategory: number, tail: string, x: number, y: number, halfHeight: boolean = false): Phaser.Physics.Matter.Image {
  const size = config.tailSize;
  const height = halfHeight ? size / 2 : size;
  const yPosition = halfHeight ? size / 2 + height / 2 + y * size : size / 2 + y * size;
  const image = (
    scene.matter.add
    .image(size / 2 + x * size, yPosition, tail)
    .setSize(size, height)
    .setDisplaySize(size, height)
    .setDepth(1)
  );

  image.setStatic(true);
  image.setCollisionCategory(platformCategory);

  return image;
}

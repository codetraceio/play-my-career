import * as Phaser from "phaser";
import { createTail, createPlatform } from "./tail";
import { sprites } from "./sprites";
import { getRandomIntager } from "./util";
import { config } from "./config";
import { IWorld } from "./world";
import { objects, objectKeys } from "./objects";

const verticalCount = config.verticalCount;
const medianY = verticalCount / 2;

export interface IBlock {
  map: string;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
  slotFilterTop?: slots[];
  slotBottom?: slots;
  slotFilterLeft?: slots[];
  slotRight?: slots;
};

enum slots {
  any = "any",
  air = "air",
  ground = "ground",
  groundHole = "ground-hole",
};

export const blocks: IBlock[] = [
  {
    map: `
    --------
    --------
    --------
    --------
    `,
    minY: 0,
    maxY: medianY - 1,
    slotBottom: slots.air,
    slotRight: slots.air,
  },
  {
    map: `
    --------
    sss--sss
    --------
    --------
    `,
    minY: medianY - 4,
    maxY: medianY - 1,
    slotBottom: slots.air,
    slotRight: slots.air,
  },
  {
    map: `
    --------
    ---ss---
    --------
    --------
    `,
    minY: medianY - 4,
    maxY: medianY - 1,
    slotBottom: slots.air,
    slotRight: slots.air,
  },
  {
    map: `
    --------
    --------
    --------
    --?--?--
    `,
    minY: medianY - 4,
    maxY: medianY - 1,
    slotBottom: slots.air,
    slotRight: slots.air,
  },
  {
    map: `
    --------
    --------
    s------s
    gss--ssg
    `,
    minY: medianY - 4,
    maxY: medianY - 1,
    slotBottom: slots.groundHole,
    slotRight: slots.air,
  },
  {
    map: `
    ssssssss
    gggggggg
    gggggggg
    gggggggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.air],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    gggggggg
    gggggggg
    gggggggg
    gggggggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.ground, slots.groundHole],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    sss--sss
    ggg--ggg
    ggg--ggg
    ggg--ggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.groundHole,
    slotRight: slots.ground,
    slotFilterTop: [slots.air],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    ggg--ggg
    ggg--ggg
    ggg--ggg
    ggg--ggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.groundHole,
    slotRight: slots.ground,
    slotFilterTop: [slots.groundHole],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    sss--sss
    ggg--ggg
    ggg??ggg
    gggssggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.air],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    ggg--ggg
    ggg--ggg
    ggg??ggg
    gggssggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.groundHole],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    sss--sss
    ggg-----
    ggg?----
    gggsssss
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.groundHole,
    slotFilterTop: [slots.air],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    ggg--ggg
    ggg-----
    ggg?----
    gggsssss
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.groundHole,
    slotFilterTop: [slots.groundHole],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    sss--sss
    -----ggg
    ----?ggg
    sssssggg
    `,
    minY: medianY,
    maxY: verticalCount,
    minX: 8,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.air],
    slotFilterLeft: [slots.groundHole, slots.ground],
  },
  {
    map: `
    ggg--ggg
    -----ggg
    ----?ggg
    sssssggg
    `,
    minY: medianY,
    maxY: verticalCount,
    minX: 8,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.groundHole],
    slotFilterLeft: [slots.groundHole, slots.ground],
  },
  {
    map: `
    ssssssss
    -----ggg
    -----ggg
    sssssggg
    `,
    minY: medianY,
    maxY: verticalCount,
    minX: 8,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.air],
    slotFilterLeft: [slots.groundHole],
  },
  {
    map: `
    gggggggg
    -----ggg
    -----ggg
    sssssggg
    `,
    minY: medianY,
    maxY: verticalCount,
    minX: 8,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.ground],
    slotFilterLeft: [slots.groundHole],
  },
  {
    map: `
    s-s--s-s
    --------
    --------
    ssssssss
    `,
    minY: medianY,
    maxY: verticalCount,
    minX: 8,
    slotBottom: slots.ground,
    slotRight: slots.groundHole,
    slotFilterTop: [slots.air],
    slotFilterLeft: [slots.groundHole, slots.ground],
  },
];

const spriteMap: Record<string, (world: IWorld, x: number, y: number) => Phaser.Physics.Arcade.Sprite> = {
  '-': null,
  '?': (world: IWorld, x: number, y: number) => {
    const object = objects[objectKeys[getRandomIntager(0, objectKeys.length)]];
    if (object.sprite) {
      return createTail(world.enemies, sprites.spikes, x, y, true);
    }
    return null;
  },
  'g': (world: IWorld, x: number, y: number) => {
    return createPlatform(world.platforms, sprites.tailGrass, x, y);
  },
  's': (world: IWorld, x: number, y: number) => {
    return createTail(world.platforms, sprites.tailGrass, x, y, false, 1);
  },
};

export function createBlock(world: IWorld, block: IBlock, startX: number, startY: number, leftBlock: IBlock | null, topBlock: IBlock | null) {
  block.map.replace(/[\r ]+/g, '').split('\n').forEach((row, j) => {
    row.split('').forEach((key, i) => {
      const x = startX + i;
      const y = startY + j - 1;
      const spriteFunc = spriteMap[key];
      if (spriteFunc) {
        spriteFunc(world, x, y);
      }
    });
  });
}

export function createRandomBlock(world: IWorld, startX: number, startY: number, leftBlock: IBlock | null, topBlock: IBlock | null) {
  const matchingBlocks = blocks.filter(block => {
    return (
      (block.minY || 0) <= startY && (block.maxY || startY) >= startY &&
      (block.minX || 0) <= startX && (block.maxX || startX) >= startX &&
      (topBlock && block.slotFilterTop ? block.slotFilterTop.includes(topBlock.slotBottom) : true) &&
      (leftBlock && block.slotFilterLeft ? block.slotFilterLeft.includes(leftBlock.slotRight) : true)
    );
  });
  const random = getRandomIntager(0, matchingBlocks.length);
  const block = matchingBlocks[random];
  if (block) {
    createBlock(world, block, startX, startY, leftBlock, topBlock);
  }
  return block;
}

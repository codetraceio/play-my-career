import * as Phaser from "phaser";
import { createTail } from "./tail";
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
    ggg--ggg
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
    ---gg---
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
    gggggggg
    gggggggg
    gggggggg
    gggggggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.ground, slots.groundHole, slots.air],
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
    slotFilterTop: [slots.groundHole, slots.air],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    ggg--ggg
    ggg--ggg
    ggg--ggg
    ggg??ggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.groundHole, slots.air],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    ggg--ggg
    ggg-----
    ggg?----
    gggggggg
    `,
    minY: medianY,
    maxY: verticalCount,
    slotBottom: slots.ground,
    slotRight: slots.groundHole,
    slotFilterTop: [slots.groundHole, slots.air],
    slotFilterLeft: [slots.ground],
  },
  {
    map: `
    ggg--ggg
    -----ggg
    ----?ggg
    gggggggg
    `,
    minY: medianY,
    maxY: verticalCount,
    minX: 8,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.groundHole, slots.air],
    slotFilterLeft: [slots.groundHole, slots.ground],
  },
  {
    map: `
    gggggggg
    -----ggg
    -----ggg
    gggggggg
    `,
    minY: medianY,
    maxY: verticalCount,
    minX: 8,
    slotBottom: slots.ground,
    slotRight: slots.ground,
    slotFilterTop: [slots.ground, slots.air],
    slotFilterLeft: [slots.groundHole],
  },
  {
    map: `
    g-g--g-g
    --------
    --------
    gggggggg
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

const spriteMap: Record<string, sprites> = {
  '-': null,
  'g': sprites.tailGroundGrass,
}

export function createBlock(world: IWorld, block: IBlock, startX: number, startY: number) {
  block.map.replace(/[\r ]+/g, '').split('\n').forEach((row, j) => {
    row.split('').forEach((key, i) => {
      const x = startX + i;
      const y = startY + j;
      if (key === '?') {
        const object = objects[objectKeys[getRandomIntager(0, objectKeys.length)]];
        if (object.sprite) {
          createTail(world.enemies, sprites.spikes, x, y, true);
        }
      }
      const sprite = spriteMap[key];
      if (sprite) {
        createTail(world.platforms, sprite, x, y);
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
    createBlock(world, block, startX, startY);
  }
  return block;
}

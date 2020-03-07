import * as Phaser from "phaser";
import { createTail } from "./tail";
import { sprites } from "./sprites";
import { getRandomIntager } from "./util";
import { config } from "./config";

const verticalCount = config.verticalCount;
const medianY = verticalCount / 2;

export interface IBlock {
  map: string;
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
    ggg-----
    ggg-----
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
    -----ggg
    gggggggg
    `,
    minY: medianY,
    maxY: verticalCount,
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

export function createBlock(scene: Phaser.Scene, block: IBlock, startX: number, startY: number) {
  block.map.replace(/[\r ]+/g, '').split('\n').forEach((row, j) => {
    row.split('').forEach((key, i) => {
      const sprite = spriteMap[key];
      if (sprite) {
        createTail(scene, sprite, startX + i, startY + j);
      }
    });
  });
}

export function createRandomBlock(scene: Phaser.Scene, startX: number, startY: number, leftBlock: IBlock | null, topBlock: IBlock | null) {
  const matchingBlocks = blocks.filter(block => {
    return (
      block.minY <= startY && block.maxY >= startY &&
      (topBlock && block.slotFilterTop ? block.slotFilterTop.includes(topBlock.slotBottom) : true) &&
      (leftBlock && block.slotFilterLeft ? block.slotFilterLeft.includes(leftBlock.slotRight) : true)
    );
  });
  const random = getRandomIntager(0, matchingBlocks.length);
  const block = matchingBlocks[random];
  if (block) {
    createBlock(scene, block, startX, startY);
  }
  return block;
}

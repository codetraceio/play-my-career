export enum sprites {
  tailGroundGrass = "tail-ground-grass",
  tailBrick = "tail-brick",
  characterAlienGreen = "character-alien-green",
  spikes = "spikes",
  coffee = "coffee",
};

export const spritesheet: Record<string, [number, number]> = {
  [sprites.characterAlienGreen]:  [64, 96],
};

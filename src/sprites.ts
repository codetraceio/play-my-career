export enum sprites {
  tailGrass = "tail-grass",
  tailBrick = "tail-brick",
  characterAlienGreen = "character-alien-green",
  spikes = "spikes",
  coffee = "coffee",
};

export const spritesheet: Record<string, [number, number]> = {
  [sprites.characterAlienGreen]:  [64, 96],
  [sprites.tailGrass]:  [64, 64],
};

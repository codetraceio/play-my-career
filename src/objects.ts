import { sprites } from "./sprites";

export interface IObject {
  sprite?: sprites,
}

export enum objectTypes {
  nothing = "nothing",
  spikes = "spikes",
};

export const objects: Record<objectTypes, IObject> = {
  [objectTypes.nothing]: {

  },
  [objectTypes.spikes]: {
    sprite: sprites.spikes,
  },
};

export const objectKeys = Object.keys(objectTypes) as objectTypes[];



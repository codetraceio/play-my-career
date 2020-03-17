import * as Phaser from "phaser";
import { direction } from "./constants";
import { IBlock } from "./blocks";

export interface IState {
  direction: direction;
  jumps: number;
  upPressed: boolean;
  map: Map<string, IBlock>;
  playerImmunityTimestamp: number;
};

export const state: IState = {
  direction: direction.right,
  jumps: 0,
  upPressed: false,
  map: new Map(),
  playerImmunityTimestamp: Date.now(),
};

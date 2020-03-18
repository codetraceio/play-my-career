import * as Phaser from "phaser";
import { direction } from "./constants";
import { IBlock } from "./blocks";

export interface IState {
  direction: direction;
  jumps: number;
  upPressed: boolean;
  map: Map<string, IBlock>;
  immunityTimestamp: number;
  touchedLeftTimestamp: number;
  touchedRightTimestamp: number;
  horizontalTouchDirection: direction;
};

export const state: IState = {
  direction: direction.right,
  jumps: 0,
  upPressed: false,
  map: new Map(),
  immunityTimestamp: 0,
  touchedLeftTimestamp: 0,
  touchedRightTimestamp: 0,
  horizontalTouchDirection: direction.none,
};

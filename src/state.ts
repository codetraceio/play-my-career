import * as Phaser from "phaser";
import { direction } from "./constants";
import { IBlock } from "./blocks";

export interface IState {
  player: Phaser.Physics.Arcade.Sprite;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  camera: Phaser.Cameras.Scene2D.Camera,
  direction: direction;
  jumps: number;
  upPressed: boolean;
  map: Map<string, IBlock>;
};

export const state: IState = {
  player: null,
  platforms: null,
  camera: null,
  direction: direction.right,
  jumps: 0,
  upPressed: false,
  map: new Map(),
};

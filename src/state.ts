import * as Phaser from "phaser";
import { direction } from "./constants";

export interface IState {
  player: Phaser.Physics.Arcade.Sprite;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  camera: Phaser.Cameras.Scene2D.Camera,
  direction: direction;
};

export const state: IState = {
  player: null,
  platforms: null,
  camera: null,
  direction: direction.right,
};

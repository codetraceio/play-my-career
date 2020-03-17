export interface IWorld {
  platforms: Phaser.Physics.Arcade.StaticGroup;
  enemies: Phaser.Physics.Arcade.StaticGroup;
  player: Phaser.Physics.Arcade.Sprite;
  camera: Phaser.Cameras.Scene2D.Camera;
}

export const world: IWorld = {
  platforms: null,
  enemies: null,
  player: null,
  camera: null,
};

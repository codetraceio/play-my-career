export interface IWorld {
  platformCatergory: number;
  enemyCategory: number;
  player: Phaser.Physics.Matter.Image;
  camera: Phaser.Cameras.Scene2D.Camera;
}

export const world: IWorld = {
  platformCatergory: 0,
  enemyCategory: 0,
  player: null,
  camera: null,
};

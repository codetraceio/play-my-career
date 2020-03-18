import * as Phaser from "phaser";
import { sprites } from "./sprites";
import { config } from "./config";
import { IState, state } from "./state";
import { animations } from "./animations";
import { direction } from "./constants";
import { world } from "./world";
import { IScene } from "./interfaces/IScene";

export function createPlayer(scene: IScene, x: number, y: number) {
  const size = config.tailSize;
  const player = (
    scene.matter.add
    .sprite(size / 2 + x * size, y * size, sprites.characterAlienGreen)
  );

  player.setRectangle(40, 96);

  player.setFixedRotation();

  // player.setCollideWorldBounds(true);
  
  scene.anims.create({
    key: animations.walkRight,
    frames: scene.anims.generateFrameNumbers(sprites.characterAlienGreen, { start: 7, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: animations.walkLeft,
    frames: scene.anims.generateFrameNumbers(sprites.characterAlienGreen, { start: 3, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: animations.lookRight,
    frames: scene.anims.generateFrameNumbers(sprites.characterAlienGreen, { start: 6, end: 6  }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: animations.lookLeft,
    frames: scene.anims.generateFrameNumbers(sprites.characterAlienGreen, { start: 4, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: animations.flyRight,
    frames: scene.anims.generateFrameNumbers(sprites.characterAlienGreen, { start: 10, end: 10 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: animations.flyLeft,
    frames: scene.anims.generateFrameNumbers(sprites.characterAlienGreen, { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1,
  });

  return player;
}

export function movePlayer(scene: IScene) {
  const cursors = scene.input.keyboard.createCursorKeys();
  const player = world.player;

  if (cursors.left.isDown) {
    player.setVelocityX(-10);
    //player.anims.play(player.body.touching.down ? animations.walkLeft : animations.flyLeft, true);

    state.direction = direction.left;
  } else if (cursors.right.isDown) {
    player.setVelocityX(10);

    //player.anims.play(player.body.touching.down ? animations.walkRight : animations.flyRight, true);
    state.direction = direction.right;
  } else {
    player.setVelocityX(0);

    // if (player.body.touching.down) {
    //   player.anims.play(state.direction === direction.left ? animations.lookLeft : animations.lookRight, true);
    // } else {
    //   player.anims.play(state.direction === direction.left ? animations.flyLeft : animations.flyRight, true);
    // }
  }

  // if (cursors.up.isDown && ( player.body.touching.down || state.jumps < 1 && !state.upPressed )) {
  //   state.jumps++;
  //   state.upPressed = true;
  //   player.setVelocityY(-540);
  // }

  if (!cursors.up.isDown) {
    state.upPressed = false;
  }

  // if (player.body.touching.down) {
  //   state.jumps = 0;
  // }

  const immunityDelta =  Date.now() - state.playerImmunityTimestamp;
  if (immunityDelta < 1000) {
    player.setAlpha(immunityDelta % 250 / 250);
  } else {
    player.setAlpha(1);
  }
}

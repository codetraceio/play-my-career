import * as Phaser from "phaser";
import { sprites, spritesheet } from "./sprites";
import { config } from "./config";
import { createTail } from "./tail";
import { createPlayer, movePlayer } from "./character";
import { state } from "./state";
import { createBorders } from "./borders";

function preload(scene: Phaser.Scene) {
  Object.values(sprites).forEach((key) => {
    if (spritesheet[key]) {
      const value = spritesheet[key];
      scene.load.spritesheet(key, `images/${key}.png`, {
        frameWidth: value[0],
        frameHeight: value[1],
      });
    } else {
      scene.load.image(key, `images/${key}.png`);
    }
  });
}

function create (scene: Phaser.Scene) {
  state.platforms = scene.physics.add.staticGroup();
  state.camera = scene.cameras.main;
  //state.camera.setViewport(0, 0, 2000, 2000);
  //state.camera.setPosition(-100, -100);
  const verticalCount = 20;
  const horizontalCount = 1000;
  scene.physics.world.setBounds(0, 0, horizontalCount * 64, verticalCount * 64);

  const tailSize = config.tailSize;
  const xCount = Math.ceil(window.innerWidth / tailSize);
  const yCount = Math.ceil(window.innerHeight / tailSize);
  const yMedian = Math.round(yCount / 2) + 1;

  createBorders(scene, horizontalCount, verticalCount);


  for (let i = 0; i < horizontalCount; i++) {
    for (let j = verticalCount - 2; j > 0; j--) {
      const probability = i < 10 && j < yMedian ? 0 : Math.max(j / verticalCount - .10, 0);
      if (Math.random() < probability) {
        createTail(scene, i, j);
      }
    }
  }
  
  createPlayer(scene, state, 2, yMedian - 2);

  state.camera.startFollow(state.player);
  
}

function update (scene: Phaser.Scene) {
  movePlayer(scene, state);
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xf8f9ff,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: true
    },
  },
  scene: {
    preload: function() {
      preload(this);
    },
    create: function() {
      create(this);
    },
    update: function() {
      update(this);
    },
  }
});

game.time.advancedTiming = true;


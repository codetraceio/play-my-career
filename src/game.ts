import * as Phaser from "phaser";
import Slopes from "phaser-slopes";
import { sprites, spritesheet } from "./sprites";
import { config } from "./config";
import { createPlayer, movePlayer } from "./player";
import { state } from "./state";
import { createBorders } from "./borders";
import { createRandomBlock } from "./blocks";
import { createTail } from "./tail";
import { createLifes, setLifes, removeLife } from "./lifes";
import { world } from "./world";


function preload(scene: Phaser.Scene) {
  console.log(Slopes);
  
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
  scene.load.scenePlugin('Slopes', Slopes);
}

function create(scene: Phaser.Scene) {
  world.platforms = scene.physics.add.staticGroup();
  world.enemies = scene.physics.add.staticGroup();
  const camera = scene.cameras.main;
  const verticalCount = config.verticalCount;
  const horizontalCount = config.horizontalCount;
  scene.physics.world.setBounds(0, 0, horizontalCount * 64, verticalCount * 64);

  const yMedian = verticalCount / 2;

  createBorders(world.platforms, horizontalCount, verticalCount);

  for (let i = 0; i < horizontalCount/8 - 1; i++) {
    for (let j = 0; j < verticalCount/4 - 1; j++) {
      const leftBlock = state.map.get(`${i-1}-${j}`);
      const topBlock = state.map.get(`${i}-${j-1}`);
      const block = createRandomBlock(world, 1 + i * 8, 1 + j * 4, leftBlock, topBlock);
      state.map.set(`${i}-${j}`, block);
    }
  }

  createLifes(scene);
  
  const player = createPlayer(scene, 2, yMedian - 2);
  world.player = player;
  state.playerImmunityTimestamp = Date.now();

  scene.physics.add.collider(player, world.platforms);
  scene.physics.add.collider(player, world.enemies, (a: Phaser.Physics.Arcade.Sprite, b: Phaser.Physics.Arcade.Sprite) => {
    if (Date.now() - state.playerImmunityTimestamp < config.immunityDelta) {
      return;
    }
    state.playerImmunityTimestamp = Date.now();
    removeLife();
  });
  camera.startFollow(world.player);
}

function update (scene: Phaser.Scene) {
  movePlayer(scene);
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

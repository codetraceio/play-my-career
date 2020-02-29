import * as Phaser from "phaser";
import { sprites, spritesheet } from "./sprites";
import { config } from "./config";
import { createTail } from "./tail";
import { createPlayer, movePlayer } from "./character";
import { state } from "./state";
function preload(scene) {
    Object.values(sprites).forEach(function (key) {
        if (spritesheet[key]) {
            var value = spritesheet[key];
            scene.load.spritesheet(key, "images/" + key + ".png", {
                frameWidth: value[0],
                frameHeight: value[1],
            });
        }
        else {
            scene.load.image(key, "images/" + key + ".png");
        }
    });
}
function create(scene) {
    state.platforms = scene.physics.add.staticGroup();
    state.camera = scene.cameras.main;
    //state.camera.setViewport(0, 0, 2000, 2000);
    //state.camera.setPosition(-100, -100);
    scene.physics.world.setBounds(0, 0, window.innerHeight, window.innerHeight);
    var tailSize = config.tailSize;
    var xCount = Math.ceil(window.innerWidth / tailSize);
    var yCount = Math.ceil(window.innerHeight / tailSize);
    var yMedian = Math.round(yCount / 2) - 1;
    createTail(scene, state, 0, yMedian);
    createTail(scene, state, 2, yMedian);
    createTail(scene, state, 3, yMedian);
    createTail(scene, state, 4, yMedian);
    createTail(scene, state, 5, yMedian);
    createTail(scene, state, 8, yMedian);
    createPlayer(scene, state, 0, yMedian - 3);
}
function update(scene) {
    movePlayer(scene, state);
}
new Phaser.Game({
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
        preload: function () {
            preload(this);
        },
        create: function () {
            create(this);
        },
        update: function () {
            update(this);
        },
    }
});

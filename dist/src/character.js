import { sprites } from "./sprites";
import { config } from "./config";
import { animations } from "./animations";
import { direction } from "./constants";
export function createPlayer(scene, state, x, y) {
    var size = config.tailSize;
    var player = (scene.physics.add
        .sprite(size / 2 + x * size, y * size, sprites.characterAlienGreen)
        .setSize(size * .6, size * 1.5)
        .setDisplaySize(size, size * 1.5));
    player.setCollideWorldBounds(true);
    scene.physics.add.collider(player, state.platforms);
    state.player = player;
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
        frames: scene.anims.generateFrameNumbers(sprites.characterAlienGreen, { start: 6, end: 6 }),
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
}
export function movePlayer(scene, state) {
    var cursors = scene.input.keyboard.createCursorKeys();
    var player = state.player;
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play(player.body.touching.down ? animations.walkLeft : animations.flyLeft, true);
        state.direction = direction.left;
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play(player.body.touching.down ? animations.walkRight : animations.flyRight, true);
        state.direction = direction.right;
    }
    else {
        player.setVelocityX(0);
        if (player.body.touching.down) {
            player.anims.play(state.direction === direction.left ? animations.lookLeft : animations.lookRight, true);
        }
        else {
            player.anims.play(state.direction === direction.left ? animations.flyLeft : animations.flyRight, true);
        }
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }
}

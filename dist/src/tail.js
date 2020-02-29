import { sprites } from "./sprites";
import { config } from "./config";
export function createTail(scene, state, x, y) {
    var size = config.tailSize;
    return (state.platforms
        .create(size / 2 + x * size, size / 2 + y * size, sprites.tailGroundGrass)
        .setSize(size, size)
        .setDisplaySize(size, size));
}

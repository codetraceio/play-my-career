export var map = new Map();
function getKey(x, y) {
    return x + "-" + y;
}
export function addToMap(x, y, sprite) {
    map.set(getKey(x, y), sprite);
}
export function deleteFromMap(x, y) {
    map.delete(getKey(x, y));
}
export function mapHas(x, y) {
    map.has(getKey(x, y));
}

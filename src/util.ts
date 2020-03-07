export function getRandomIntager(min: number, max: number) {
  return Math.floor(min) + Math.floor(Math.random() * Math.floor(max - min));
}

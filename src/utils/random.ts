import { animals, colors, adjectives } from "unique-names-generator";

export function randNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function randDictionaries() {
  const dictionaries = [animals, colors, adjectives];
  return [...dictionaries];
}

export function randBoolean() {
  return Math.random() < 0.5;
}

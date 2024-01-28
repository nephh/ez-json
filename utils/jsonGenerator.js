import { uniqueNamesGenerator, names } from "unique-names-generator";
import { randNumber, randString, randDictionaries } from "./randomGenerator.js";

function handleNum(key, value) {
  // Making sure that the number we generate is somewhat similar to the
  // user's input, i.e. the same amount of digits
  const numberOfDigits = Math.max(
    Math.floor(Math.log10(Math.abs(value))) + 1,
    1
  );
  const min = 10 ** (numberOfDigits - 1);
  const max = 10 ** numberOfDigits - 1;
  return [key, randNumber(min, max)];
}

function handleString(key, value) {
  const parsedKey = key.toLowerCase().replace(/[\s\-_]/g, "");

  const emailExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  const handlers = {
    name: () => [
      key,
      `${uniqueNamesGenerator({
        dictionaries: [names],
      })} ${uniqueNamesGenerator({ dictionaries: [names] })}`,
    ],
    fullname: () => [
      key,
      `${uniqueNamesGenerator({
        dictionaries: [names],
      })} ${uniqueNamesGenerator({ dictionaries: [names] })}`,
    ],
    username: () => [
      key,
      uniqueNamesGenerator({
        dictionaries: randDictionaries(),
        length: 2,
        separator: "",
        style: "capital",
      }),
    ],
    address: () => [
      key,
      `${randNumber(10, 4999)} ${uniqueNamesGenerator({
        dictionaries: [names],
      })} St.`,
    ],
    firstname: () => [key, uniqueNamesGenerator({ dictionaries: [names] })],
    lastname: () => [key, uniqueNamesGenerator({ dictionaries: [names] })],
  };

  if (handlers[parsedKey]) {
    return handlers[parsedKey]();
  } else if (emailExp.test(value)) {
    return [
      key,
      `${uniqueNamesGenerator({
        dictionaries: randDictionaries(),
        length: 2,
        separator: "-",
        style: "lowerCase",
      })}@${randString(randNumber(2, 5))}.com`,
    ];
  } else if (phoneExp.test(value)) {
    const phone = `Phone Number Generated Here`;
    return [key, phone];
  } else {
    return [key, randString(randNumber(4, 12))];
  }
}

export default function generateJSON(template) {
  return Object.fromEntries(
    template.map(([key, value]) => {
      switch (typeof value) {
        case "number":
          return handleNum(key, value);
        case "string":
          return handleString(key, value);
        default:
          return [key, value];
      }
    })
  );
}

import { uniqueNamesGenerator, names } from "unique-names-generator";
import {
  randNumber,
  randString,
  randDictionaries,
  randBoolean,
} from "./random";
import generateValue from "./ai";
// import generateValue from "./ai";

function handleNum(key: string, value: number) {
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

async function handleString(key: string, value: string) {
  const parsedKey = key.toLowerCase().replace(/[\s\-_]/g, "");

  const emailExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  function generateName() {
    return uniqueNamesGenerator({ dictionaries: [names] });
  }

  const handlers = {
    name: () => [key, `${generateName()} ${generateName()}`],
    fullname: () => [key, `${generateName()} ${generateName()}`],
    username: () => [
      key,
      uniqueNamesGenerator({
        dictionaries: randDictionaries(),
        length: 2,
        separator: "",
        style: "capital",
      }),
    ],
    address: () => [key, `${randNumber(10, 4999)} ${generateName()} St.`],
    firstname: () => [key, generateName()],
    lastname: () => [key, generateName()],
  };

  const handler = handlers[parsedKey as keyof typeof handlers];

  if (handler) {
    return handler();
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
  } else {
    const newValue = await generateValue(key);
    return [key, newValue];
  }
}

// We take in the template object and generate a new object with the same keys.
// Converting to an array first seems dumb but it works and my brain hurts.
async function generateJSON(template: Template) {
  const entries = Object.entries(template).map(([key, value]) => {
    switch (typeof value) {
      case "number":
        return handleNum(key, value);
      case "string":
        return handleString(key, value);
      case "boolean":
        return [key, randBoolean()];
      default:
        return [key, value];
    }
  });

  const resolvedEntries = await Promise.all(entries);
  return Object.fromEntries(resolvedEntries);
}

export async function createJsonFile(input: Template, numObjects: number) {
  const jsonData =
    numObjects > 1
      ? Promise.all([
          input,
          ...Array.from({ length: numObjects }, () => generateJSON(input)),
        ])
      : input;

  const json = JSON.stringify(await jsonData, null, 2);

  return json;
}

interface Template {
  [key: string]: string | number | boolean;
}

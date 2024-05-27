import { uniqueNamesGenerator, names } from "unique-names-generator";
import { randNumber, randString, randDictionaries } from "./random";
import generateValue from "./ai";

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

export default async function generateJSON(
  template: Array<[string, string | number]>
) {
  const entries = await Promise.all(
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

  return Object.fromEntries(entries);
}

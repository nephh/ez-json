import { uniqueNamesGenerator, names } from "unique-names-generator";
import { randNumber, randString, randDictionaries } from "./randomGenerator.js";

function handleNum(key, value) {
  // Making sure that the number we generate is somewhat similar to the
  // user's input.
  const numberOfDigits = Math.max(
    Math.floor(Math.log10(Math.abs(value))) + 1,
    1
  );
  const lowerBound = 10 ** (numberOfDigits - 1);
  const upperBound = 10 ** numberOfDigits - 1;
  return [key, randNumber(lowerBound, upperBound)];
}

function handleString(key, value) {
  const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const firstNames = ["firstname", "first-name", "first_name"];
  const lastNames = ["lastname", "last-name", "last_name"];

  if (key === "name") {
    return [
      key,
      // First and last name
      `${uniqueNamesGenerator({
        dictionaries: [names],
      })} ${uniqueNamesGenerator({ dictionaries: [names] })}`,
    ];
  } else if (key === "username") {
    return [
      key,
      uniqueNamesGenerator({
        dictionaries: randDictionaries(),
        length: 2,
        separator: "",
        style: "capital",
      }),
    ];
  } else if (key === "address") {
    return [
      key,
      `${randNumber(10, 4999)} ${uniqueNamesGenerator({
        dictionaries: [names],
      })} St.`,
    ];
  } else if (firstNames.includes(key) || lastNames.includes(key)) {
    return [
      key,
      uniqueNamesGenerator({
        dictionaries: [names],
      }),
    ];
  } else if (regex.test(value)) {
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

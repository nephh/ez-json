import { uniqueNamesGenerator, names } from "unique-names-generator";
import { randNumber, randString, randDictionaries } from "./randomGenerator.js";

function handleString(key, value) {
  const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const firstNames = ["firstname", "first-name", "first_name"];
  const lastNames = ["lastname", "last-name", "last_name"];

  if (key === "name") {
    return [
      key,
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
          return [key, randNumber(1, 999)];
        case "string":
          return handleString(key, value);
        default:
          return [key, value];
      }
    })
  );
}

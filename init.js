#!/usr/bin/env node
import { argv } from "./utils/yargs.js";
import dataInput from "./utils/input.js";
import generateJSON from "./utils/jsonGenerator.js";
import fs from "fs";

const numObjects = argv.objects;
const save = argv.s;

const ascii = `
░█▀▀░▀▀█░░░▀▀█░█▀▀░█▀█░█▀█
░█▀▀░▄▀░░░░░░█░▀▀█░█░█░█░█
░▀▀▀░▀▀▀░░░▀▀░░▀▀▀░▀▀▀░▀░▀
\n`;

async function init() {
  console.log(ascii);

  const userInput = await dataInput();

  let jsonData =
    numObjects > 1
      ? [
          Object.fromEntries(userInput),
          ...Array.from({ length: numObjects - 1 }, () =>
            generateJSON(userInput),
          ),
        ]
      : Object.fromEntries(userInput);

  jsonData = JSON.stringify(jsonData, null, 2);

  console.log(jsonData);

  if (save) {
    fs.writeFile("ez-json.json", jsonData, (err) => {
      if (err) {
        console.error("Error saving JSON file:", err);
        return;
      }
      console.log("JSON file saved successfully.");
    });
  }
}

init();

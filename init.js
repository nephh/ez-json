#!/usr/bin/env node
import { argv } from "./utils/yargs.js";
import dataInput from "./utils/input.js";
import generateJSON from "./utils/jsonGenerator.js";
import fs from "fs";

let print = argv.p;
let numObjects = argv._[0] || 1;
let save = argv.s;

const ascii = `
░█▀▀░▀▀█░░░░░▀▀█░█▀▀░█▀█░█▀█
░█▀▀░▄▀░░▄▄▄░░░█░▀▀█░█░█░█░█
░▀▀▀░▀▀▀░░░░░▀▀░░▀▀▀░▀▀▀░▀░▀
\n`;

async function init() {
  console.log(ascii);
  if (!print && !save) {
    console.log("You must enter at least one valid flag!");
    return;
  }

  const userInput = await dataInput();

  let jsonData =
    numObjects > 1
      ? [
          Object.fromEntries(userInput),
          ...Array.from({ length: numObjects - 1 }, () =>
            generateJSON(userInput)
          ),
        ]
      : Object.fromEntries(userInput);

  jsonData = JSON.stringify(jsonData, null, 2);

  if (print) {
    console.log(jsonData);
  }

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

#!/usr/bin/env node
import { argv } from "./utils/yargs.js";
import dataInput from "./utils/input.js";
import generateJSON from "./utils/generateJson.js";
import fs from "fs";

let print = argv.p;
let numObjects = argv.n || 1;
let save = argv.s;

async function init() {
  if (!print && !save) {
    console.log("You must enter at least one valid flag.");
    return;
  }

  const userInput = await dataInput();

  let jsonData =
    numObjects === 1
      ? Object.fromEntries(userInput)
      : [
          Object.fromEntries(userInput),
          ...Array.from({ length: numObjects - 1 }, () =>
            generateJSON(userInput)
          ),
        ];

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

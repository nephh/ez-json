#!/usr/bin/env node
import { argv } from "./utils/yargs.js";
import dataInput from "./utils/input.js";
import generateJSON from "./utils/jsonGenerator.js";
import fs from "fs";

const numObjects = argv.objects;
const save = argv.s;
const filepath = argv.filepath;

async function init() {
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

  console.log(jsonData);

  if (filepath) {
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
    }
    fs.writeFile(`${filepath}/ez-json.json`, jsonData, (err) => {
      if (err) {
        console.error("Error saving JSON file:", err);
        return;
      }
      console.log(`JSON file saved successfully to "${filepath}".`);
    });
  } else if (save) {
    fs.writeFile("ez-json.json", jsonData, (err) => {
      if (err) {
        console.error("Error saving JSON file:", err);
        return;
      }
      console.log("JSON file saved successfully.");
    });
  } else {
    console.log(argv.s);
  }
}

init();

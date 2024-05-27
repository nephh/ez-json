#!/usr/bin/env node
import { argv } from "./utils/yargs";
import dataInput from "./utils/input";
import generateJSON from "./utils/json";
import fs from "fs";

const numObjects = argv.objects;
const save = argv.save;

async function init() {
  const userInput = await dataInput();

  const jsonData =
    numObjects > 1
      ? await Promise.all([
          Object.fromEntries(userInput),
          ...Array.from({ length: numObjects - 1 }, () =>
            generateJSON(userInput)
          ),
        ])
      : Object.fromEntries(userInput);

  const json = JSON.stringify(jsonData, null, 2);

  console.log(json);

  if (save) {
    fs.writeFile("ez-json.json", json, (err) => {
      if (err) {
        console.error("Error saving JSON file:", err);
        return;
      }
      console.log("JSON file saved successfully.");
    });
  }
}

init();

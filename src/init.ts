#!/usr/bin/env node
import { argv } from "./utils/yargs";
import { dataInput, fileInput } from "./utils/input";
import fs from "fs";
import { createJsonFile } from "./utils/json";

async function init() {
  const numObjects = argv.objects;
  const save = argv.save;
  let json: string;

  if (argv.file) {
    const fileData = Object.fromEntries(await fileInput(argv.file));
    console.log("Generating JSON from file...");
    json = await createJsonFile(fileData, numObjects);
  } else {
    const userInput = Object.fromEntries(await dataInput());
    json = await createJsonFile(userInput, numObjects);
  }

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

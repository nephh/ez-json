#!/usr/bin/env node
import { argv } from "./utils/yargs";
import { dataInput, fileInput } from "./utils/input";
import generateJSON from "./utils/json";
import fs from "fs";

async function init() {
  const numObjects = argv.objects;
  const save = argv.save;

  const fileData = await fileInput();
  console.log("File Data: ", fileData);

  const userInput = await dataInput();
  console.log("User Input: ", userInput);

  const jsonData =
    numObjects > 1
      ? await Promise.all([
          fileData
            ? Object.fromEntries(fileData)
            : Object.fromEntries(userInput),
          ...Array.from({ length: numObjects - 1 }, () =>
            fileData ? generateJSON(fileData) : generateJSON(userInput)
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

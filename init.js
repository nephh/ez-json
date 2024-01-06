#!/usr/bin/env node
import { input } from "@inquirer/prompts";
import { argv } from "./utils/yargs.js";
import generateJSON from "./utils/generateJson.js";
import fs from "fs";

let print = argv.p;
let numObjects = argv.n || 1;
let save = argv.s;
let userInput = [];

const sample = {
  name: "Owen",
  password: "abc123",
  email: "test@test.com",
  number: 26,
};

async function dataInput() {
  while (true) {
    const key = await input({
      message:
        userInput.length === 0
          ? "Enter a key: "
          : "Enter another key (leave blank to finish): ",
    });

    if (key === "") {
      return;
    }

    const value = await input({
      message: "Enter a value: ",
    });

    const parsedValue = isNaN(Number(value)) ? value : Number(value);
    userInput.push([key, parsedValue]);
  }

  return userInput;
}

async function init() {
  if (!print && !save) {
    console.log("You must enter at least one valid flag.");
    return;
  }

  await dataInput();

  let jsonData = Array.from({ length: numObjects }, () =>
    generateJSON(userInput)
  );
  jsonData = JSON.stringify(
    jsonData.length === 1 ? jsonData[0] : jsonData,
    null,
    2
  );

  if (print) {
    console.log(jsonData);
  }

  if (save) {
    fs.writeFile("ez-json.json", jsonData, (err) => {
      if (err) {
        console.error("Error saving JSON file:", err);
        return;
      }
      console.log("File saved successfully.");
    });
  }
}

init();

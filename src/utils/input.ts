import { input } from "@inquirer/prompts";
import fs from "fs";

export async function dataInput() {
  const arr: Array<[string, string | number | boolean]> = [];
  while (true) {
    let key = await input({
      message:
        arr.length === 0
          ? "Enter a key: "
          : "Enter another key (leave blank to finish): ",
    });

    if (key === "") {
      return arr;
    }

    let value = await input({
      message: "Enter a value: ",
    });

    let parsedValue: string | number | boolean = isNaN(Number(value))
      ? value.trim() === "true" || value.trim() === "false"
        ? value.trim() === "true"
        : value.trim()
      : Number(value);

    key = key.trim();

    arr.push([key, parsedValue]);
  }
}

export async function fileInput(file: string) {
  if (!file.endsWith(".json")) {
    throw new Error("Invalid JSON file.");
  }

  const fileData = fs.readFileSync(file, "utf8");
  const match = fileData.match(/{([^}]*)}/);

  if (!match) {
    throw new Error("Invalid JSON file.");
  }

  const extractedText = `{${match[1]}}`;
  const keyValueArray: Array<[string, string | number | boolean]> =
    Object.entries(JSON.parse(extractedText));
  return keyValueArray;
}

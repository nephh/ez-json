import { input } from "@inquirer/prompts";
import { argv } from "./yargs";
import fs from "fs";

export async function dataInput() {
  const arr: Array<[string, string | number]> = [];
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

    key = key.trim();
    const parsedValue = isNaN(Number(value)) ? value.trim() : Number(value);

    arr.push([key, parsedValue]);
  }
}

export async function fileInput() {
  if (!argv.file) {
    return;
  }

  const fileData = fs.readFileSync(argv.file, "utf8");
  const match = fileData.match(/{([^}]*)}/);
  const extractedText = match ? `{${match[1]}}` : "";
  const keyValueArray: Array<[string, string | number]> = Object.entries(
    JSON.parse(extractedText)
  );
  return keyValueArray;
}

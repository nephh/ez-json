import { input } from "@inquirer/prompts";

export default async function dataInput() {
  const arr = [];
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

    key = typeof key === "string" ? key.trim() : key;

    const parsedValue = isNaN(value) ? value.trim() : Number(value);
    arr.push([key, parsedValue]);
  }
}

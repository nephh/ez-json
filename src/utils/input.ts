import { input } from "@inquirer/prompts";

export default async function dataInput() {
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

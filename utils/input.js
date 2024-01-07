import { input } from "@inquirer/prompts";

export default async function dataInput() {
  const arr = [];
  while (true) {
    const key = await input({
      message:
        arr.length === 0
          ? "Enter a key: "
          : "Enter another key (leave blank to finish): ",
    });

    if (key === "") {
      return arr;
    }

    const value = await input({
      message: "Enter a value: ",
    });

    const parsedValue = isNaN(Number(value)) ? value : Number(value);
    arr.push([key.trim().toLowerCase(), parsedValue.trim()]);
  }
}

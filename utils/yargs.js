import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
  .scriptName("ez-json")
  .usage("Usage: json [options]\n\nEZ-JSON: A JSON generator tool")
  .options({
    p: {
      alias: "print",
      describe: "Print the generated JSON file to the console",
      type: "boolean",
    },
    s: {
      alias: "save",
      describe: "Save JSON to a file.",
      type: "boolean",
    },
    n: {
      alias: "number",
      describe:
        "Enter the number of objects you would like generated in the file after this flag.",
      type: "number",
    },
  })
  .alias({
    h: "help",
    v: "version",
  })
  .help().argv;

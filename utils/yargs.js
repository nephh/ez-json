import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
  .scriptName("ez-json")
  .usage(
    "EZ-JSON: A JSON generator tool\n\nUsage: json [options] <number of objects>"
  )
  .example("json -ps 5", "Print and save 5 objects to a JSON file.")
  .check((argv) => {
    if (argv.p || argv.s) {
      return true;
    } else {
      throw new Error("At least one flag, -p or -s, must be provided.");
    }
  })
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
  })
  .alias({
    h: "help",
    v: "version",
  })
  .help().argv;

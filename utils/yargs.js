import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const ascii = `
░█▀▀░▀▀█░░░▀▀█░█▀▀░█▀█░█▀█
░█▀▀░▄▀░░░░░░█░▀▀█░█░█░█░█
░▀▀▀░▀▀▀░░░▀▀░░▀▀▀░▀▀▀░▀░▀
\n`;

export const argv = yargs(hideBin(process.argv))
  .command({
    command: "$0 [objects]",
    describe: "Generate some JSON",
    builder: {
      objects: {
        describe: `Number of objects to be generated. The first number 
          given as an argument will be used.`,
        type: "number",
        alias: "o",
      },
    },
    handler: () => {
      console.log(ascii);
    },
  })
  .scriptName("ez-json")
  .usage(
    "EZ JSON: A JSON generator tool\n\nCommands:\n" +
      "  ./init.js <objects> [options]"
  )
  .example(
    "json 4 -sf ./data",
    `Generate 5 objects and save them to a JSON file in "./data".`
  )
  .options({
    s: {
      alias: "save",
      describe: "Save JSON to a file. Defaults to the current directory.",
      type: "boolean",
    },
    f: {
      alias: "filepath",
      describe: "Choose a different directory to save the file to.",
      type: "string",
    },
  })
  .alias({
    h: "help",
    v: "version",
  })
  .help()
  .parse();

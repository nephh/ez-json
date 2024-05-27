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
    handler: () => {
      console.log(ascii);
    },
  })
  .scriptName("ez-json")
  .usage(
    "EZ JSON: A JSON generator tool\n\nCommands:\n" +
      "  ./init.js [options] <objects>"
  )
  .example("json -s 5", "Generate 5 objects and save them to a JSON file.")
  .options({
    save: {
      describe: "Save JSON to a file.",
      type: "boolean",
    },
    objects: {
      describe: `Number of objects to be generated. The first number 
      given as an argument will be used.`,
      type: "number",
      default: 1,
    },
  })
  .alias({
    s: "save",
    o: "objects",
    h: "help",
    v: "version",
  })
  .help()
  .parseSync();

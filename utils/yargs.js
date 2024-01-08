import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

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
    handler: (argv) => {
      console.log("Generating JSON...");
    },
  })
  .scriptName("ez-json")
  .usage(
    "EZ JSON: A JSON generator tool\n\nCommands:\n" +
      "  ./init.js [options] <objects>"
  )
  .example("json -s 5", "Generate 5 objects and save them to a JSON file.")
  .options({
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
  .help()
  .parse();

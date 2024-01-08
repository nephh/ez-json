import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
  .command("$0 [objects]", "generate some json", (yargs) => {
    yargs.positional("objects", {
      describe: "The amount of objects you want generated. Defaults to 1.",
      type: "number",
      default: 1,
    });
  })
  .scriptName("ez-json")
  .usage("EZ-JSON: A JSON generator tool\n\nCommands: json <objects> [options]")
  .example("json 5 -s", "Generate 5 objects and save them to a JSON file.")
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

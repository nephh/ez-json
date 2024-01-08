<div align="center">

<img src="./assets/ezjson.png" alt="ez-json logo" width="300"/>

[![GitHub License](https://img.shields.io/github/license/nephh/ez-json?style=for-the-badge&color=blue)](https://www.apache.org/licenses/LICENSE-2.0)

EZ JSON is a command-line interface (CLI) tool for generating JSON data based on user input. It's useful for quickly creating mock data for testing or development purposes. Whether you need to quickly test an endpoint, or you need a huge seed file, EZ JSON makes it easy, and most importantly, _fast_.

</div>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the tool, you'll need to have Node.js installed on your computer. Once you have Node.js installed, you can install the tool by cloning the repository and installing its dependencies:

```bash
mkdir ez-json
git clone https://github.com/nephh/ez-json
cd ez-json
npm install
```

**For now, EZ JSON must be cloned and ran like any normal JavaScript file. Very soon™️ it will be an NPM package that can be globally installed, so you can generate your data from anywhere.**

## Usage

EZ-JSON allows you to generate JSON objects based on key-value pairs that you define. This tool takes care of the JSON formatting for you, so you can focus on the data you want to generate.

To use EZ-JSON, run the following command:

```bash
node init.js [options] <number of objects>
```

In this command, `<number of objects>` represents the number of JSON objects you want to generate. If you don't specify a number, EZ-JSON will generate a single object by default.

The available options are:

- `-p, --print`: Print the generated JSON file to the console.

- `-s, --save`: Save the generated JSON to a file named "ez-json.json".

- `-h, --help`: The help menu.

- `-v, --version`: See what version of EZ-JSON you are running.

### Examples

Here are a few examples of how to use EZ-JSON:

- To generate a single JSON object and print it to the console, run:

  ```bash
  node init.js -p
  ```

- To generate 5 JSON objects, print them to the console, and save them to a file, run:

  ```bash
  node init.js -ps 5
  ```

Remember, you can combine options to tailor the command to your needs.

<script async id="asciicast-569727" src="https://asciinema.org/a/569727.js"></script>

## Future Features

<details>
<summary> This project is very much in it's infancy, so there are quite a few features, bugs, and edge cases that are being worked on, and more are always being thought of. Click here if you want to see the madness of my mind.
</summary>

<br />

As of right now, the string generation is very barebones and random. Very soon™️ more specific keys will be checked, so that more accurate values will be generated from a set dictionary based on the keys. The specificity of the values generated is not very deep at the moment.

Deal with duplicate numbers, as of now if you need to generate 100 users all with unique userIds, there's gonna be duplicates. Adding a flag to not allow duplicate numbers is high priority, while more advanced cases will probably need to be handled in a more customizable way.

I also want to make this extendable, which means allowing users to specify a custom regex or a predefined set of words for more explicit values. User defined dictionaries used for specific keys, existing JSON file importing, all these things are future ideas focused on allowing the user to customize their JSON generation to their hearts content.

Whether these customizations will become extra arguments in the CLI, or a config file is still up for debate. A config would probably be best for more in-depth custom values.

I plan on rewriting this in Go, but I first need to learn the ins and outs of the language, so this will live on node for now.

Once this is an official npm package, installing with the --global flag will allow you to generate JSON in any directory.

</details>

## Project Structure

- `init.js`: The main script that runs the JSON generator.

- `utils/`: Contains utility modules for the project.

  - `input.js`: Handles input from the command line.

  - `jsonGenerator.js`: Contains functions for generating JSON data.

  - `randomGenerator.js`: Contains functions for generating random data.

  - `yargs.js`: Handles command line arguments using yargs.

## Thank You

There are many JSON file generators out there that have very in-depth generation, but they don't capture the simplicity and speed that I hope to bring with EZ JSON.

Thank you for checking it out, and for being here along for the ride ^-^

Feel free to contact me here on GitHub, I love to chat about anything programming or art related!

## Contributing

Contributions are welcome. Please submit a pull request or create an issue to propose changes or additions.

## License

This project is licensed under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).

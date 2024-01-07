<div align="center">

# EZ-JSON CLI

![GitHub License](https://img.shields.io/github/license/nephh/ez-json?style=for-the-badge&color=blue)


EZ-JSON is a command-line interface (CLI) tool for generating JSON data based on user input. It's useful for quickly creating mock data for testing or development purposes. Whether you need to quickly test a post endpoint, or you need a huge seed file, EZ-JSON makes it simple and easy.

</div>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the tool, you'll need to have Node.js installed on your computer. Once you have Node.js installed, you can install the tool by cloning the repository and installing its dependencies:

```
mkdir ez-json
git clone https://github.com/nephh/ez-json
cd ez-json
npm install
```

## Usage

The tool uses a sample JSON object to generate data. The sample object is defined by the user input.

You can run the tool with the following command:

```
node init.js [options]
```

The available options are:

- `-p, --print`: Print the generated JSON file to the console.

- `-s, --save`: Save the generated JSON to a file named "ez-json.json".

- `-n, --number`: Enter the number of objects you would like generated in the file after this flag. This defaults to 1 if not specified.

- `-h, --help`: The help menu.

- `-v, --version`: See what version of EZ-JSON you are running.

For example, to quickly generate one object and print it out for copying, you would use:

```
node init.js -p
```

Just like any other CLI tool, you can combine flags to simplify the commands.
The following will generate 5 objects, print them out, and save them to a file:

```
node init.js -nps 5
```

## Future Features

As of right now, the string generation is very barebones and random. Very soon™️ specific keys will be checked, and values will be generated from a set dictionary based on the key.

I also want to make this extendable, which means allowing users to specify regexs for more explicit values. User defined dictionaries used for specific keys, existing JSON file importing, all these things are future ideas focused on allowing the user to customize their JSON generation to their hearts content.

I plan on rewriting this in Go, but I first need to learn the ins and outs of the language, so this will live on node for now.

Once this is an official npm package, installing with the --global flag will allow you to generate JSON in any directory, without needing another dev dependency.

## Code Structure

The main entry point of the application is the init.js file. This file imports necessary modules and defines the main function that handles user input and JSON generation.

The utils/yargs.js file sets up the command-line arguments using the yargs library.

The utils/input.js file handles user input.

The utils/generateJson.js file contains the logic for generating random JSON data based on the user input.

## Contributing

Contributions are welcome. Please submit a pull request or create an issue to propose changes or additions.

## License

This project is licensed under the Apache 2.0 license.

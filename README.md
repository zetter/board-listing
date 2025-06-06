# board-listing-challenge

To install dependencies:

```bash
bun install
```

To run:

```bash
bun combine [directory]
```

To test:

```bash
bun test
```

To type check:

```bash
bun tsc
```

To serve the json:

```bash
bun serve
```

### Info

+ I wanted to try Bun for this project as it run Typescript files and has useful APIs for dealing with files and has the option to make a standalone executable that can make distribution easier. I referenced the Bun documentation to do this.
+ I have a single integration test, and a few unit test cases
+ I've added a github actions workflow to make sure it works as expected across different environments. I generated this with Github Copilot.
+ I haven't considered other malformed or missing data. The JSON input is typed but this will only catch missing at the compile time, so the type check will error if the unit tests contain incorrect data, but not not if files contain missing data when running the program.
+ I've assumed trusted input to the program- it would be possible to access JSON files outside the current directory.
+ I've created a `serve.ts` script that will serve the JSON created by the command over HTTP. I chose to use the test JSON as the input, but this could be extended to use JSON provided in the HTTP request.
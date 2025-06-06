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

+ I wanted to try Bun for this project as it can run TypeScript files and has useful APIs for dealing with files and has the option to make a standalone executable that can make distribution easier. I referenced the Bun documentation to do this.
+ I have a single integration test, and a few unit test cases
+ I've added a GitHub actions workflow to make sure the project works as expected across different operating systems. I generated the workflow with Github Copilot.
+ I haven't considered other malformed or missing data. The JSON input is typed but this will only catch missing keys at compile time, so the type check will error if the unit tests contain incorrect data, but not if files contain missing data when running the program.
+ I've assumed trusted input to the program. It would be possible to access JSON files outside the current directory with certain inputs.
+ I've created a `serve.ts` script that will serve the output JSON over HTTP. I chose to use the test JSON as the input, but this could be extended to use JSON provided in the HTTP request.


### Building

Bun allows you to build executable to make projects easier to distribute. You can build this project for the current platform with:

```bash
bun build ./combine.ts  --compile --outfile combine
```
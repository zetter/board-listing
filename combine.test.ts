import { expect, test } from "bun:test";
import { join } from "path";
import { $ } from "bun";

const currentDir = import.meta.dir;

test("combines input files to expected output", async () => {

    const output = await $`bun run combine ${join(currentDir, 'test_data', 'example_boards')}`.text();
    const parsedOutput = JSON.parse(output);

    const file = Bun.file(join(currentDir, 'test_data', 'output.json'));
    const expectedOutput = await file.json();

    expect(parsedOutput).toEqual(expectedOutput);
});
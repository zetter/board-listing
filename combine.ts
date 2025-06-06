import { Glob } from "bun";
import { join } from "path";
import Combiner from "./combiner";

const glob = new Glob("*.json");
const args = Bun.argv.slice(2)
const directory = args[0]

if (!directory) {
    console.error("Please provide a directory as an argument");
    process.exit(1);
}

const combiner = new Combiner()
const files = glob.scan(directory)

for await (const file of files) {
    const data = Bun.file(join(directory, file))
    const parsedData = await data.json()
    combiner.add(parsedData)
}

console.log(JSON.stringify(combiner.result()))
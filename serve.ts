import { join } from "path";
import Combiner from "./combiner";

const currentDir = import.meta.dir;
const dataDir = join(currentDir, 'test_data', 'example_boards')
const file_one = join(dataDir, 'boards-1.json')
const file_two = join(dataDir, 'boards-2.json')


const fetchBoards = async (_request: Request) => {
    const combiner = new Combiner()

    for await (const file of [file_one, file_two]) {
        const data = Bun.file(file)
        const parsedData = await data.json()
        combiner.add(parsedData)
    }

    const data = JSON.stringify(combiner.result())
    return new Response(data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const server = Bun.serve({
    port: 3000,
    fetch: fetchBoards,
});

console.log(`Listening on ${server.url}`);
import { Glob } from "bun";

const glob = new Glob("*.json");

const args = Bun.argv.slice(2)
const directory = args[0]

const compareBoards = (a, b) => {
    if (a.vendor < b.vendor) return -1;
    if (a.vendor > b.vendor) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

let boards = []

for await (const file of glob.scan(directory)) {
    const data = Bun.file(`${directory}/${file}`)
    const parsedData = await data.json()
    boards = boards.concat(parsedData.boards)
}

boards.sort(compareBoards)

console.log(JSON.stringify({ boards }))
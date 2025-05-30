import { Glob } from "bun";

type Board = {
    core: string;
    has_wifi: boolean;
    name: string;
    vendor: string;
};

const glob = new Glob("*.json");

const args = Bun.argv.slice(2)
const directory = args[0]
const vendors = new Set();
const boards: Board[] = [];

const compareBoards = (a: Board, b: Board) => {
    if (a.vendor < b.vendor) return -1;
    if (a.vendor > b.vendor) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

for await (const file of glob.scan(directory)) {
    const data = Bun.file(`${directory}/${file}`)
    const parsedData = await data.json()
    parsedData.boards.forEach((board: Board) => {
        vendors.add(board.vendor)
        boards.push(board)
    })
}

boards.sort(compareBoards)

const result = {
    boards,
    _metadata: {
        total_vendors: vendors.size,
        total_boards: boards.length
    }
}

console.log(JSON.stringify(result))
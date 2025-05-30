
type Board = {
    core: string;
    has_wifi: boolean;
    name: string;
    vendor: string;
};

const compareBoards = (a: Board, b: Board) => {
    if (a.vendor < b.vendor) return -1;
    if (a.vendor > b.vendor) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

class Combiner {
    private boards: Board[] = [];
    private vendors = new Set();

    add(data: { boards: Board[] }) {
        (data.boards || []).forEach(board => {
            this.boards.push(board);
            this.vendors.add(board.vendor);
        });
    }

    result() {
        this.boards.sort(compareBoards);
        return {
            boards: this.boards,
            _metadata: {
                total_vendors: this.vendors.size,
                total_boards: this.boards.length
            }
        };
    }
}

export default Combiner;
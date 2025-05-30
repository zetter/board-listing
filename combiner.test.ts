import { expect, test, describe } from "bun:test";
import Combiner from "./combiner";

describe('Combiner', () => {
    test("combines input data to expected output", async () => {
        const inputOne = {
            "boards": [
                {
                    "name": "B7-400X",
                    "vendor": "Boards R Us",
                    "core": "Cortex-M7",
                    "has_wifi": true
                },
            ]
        }

        const inputTwo = {
            "boards": [
                {
                    "name": "D4-200S",
                    "vendor": "Boards R Us",
                    "core": "Cortex-M4",
                    "has_wifi": false
                }
            ]
        }

        const expectedOutput = {
            "boards": [
                {
                    "name": "B7-400X",
                    "vendor": "Boards R Us",
                    "core": "Cortex-M7",
                    "has_wifi": true
                },
                {
                    "name": "D4-200S",
                    "vendor": "Boards R Us",
                    "core": "Cortex-M4",
                    "has_wifi": false
                }
            ],
            "_metadata": {
                "total_vendors": 1,
                "total_boards": 2
            }
        }

        const combiner = new Combiner();

        combiner.add(inputOne);
        combiner.add(inputTwo);

        const output = combiner.result();

        expect(output).toEqual(expectedOutput);
    });

    test("is can build a result when no data is added", () => {
        const combiner = new Combiner();
        const output = combiner.result();

        expect(output).toEqual({
            boards: [],
            _metadata: {
                total_vendors: 0,
                total_boards: 0
            }
        });
    });

    test("it can handle inputs with a list of no boards", () => {
        const input = {
            "boards": []
        };

        const expectedOutput = {
            "boards": [],
            "_metadata": {
                "total_vendors": 0,
                "total_boards": 0
            }
        };

        const combiner = new Combiner();
        combiner.add(input);
        const output = combiner.result();

        expect(output).toEqual(expectedOutput);
    });

    test("it ignores inputs with no boards key", () => {
        const input = {} as any;

        const expectedOutput = {
            "boards": [],
            "_metadata": {
                "total_vendors": 0,
                "total_boards": 0
            }
        };

        const combiner = new Combiner();
        combiner.add(input);
        const output = combiner.result();

        expect(output).toEqual(expectedOutput);
    });
});

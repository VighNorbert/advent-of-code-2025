import { sum, range } from './utils';

const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split(''));

const PAPER_ROLL = '@';
const EMPTY_CELL = '.';

const markRemovables = (rolls: string[][]) => {
	const newRolls = rolls.map((row) => row.slice());
	let removedRolls = 0;
	rolls.map((row, i, rolls) =>
		row.map((cell, j) => {
			if (
				cell == PAPER_ROLL &&
				range(-1, 1)
					.flatMap((di) =>
						range(-1, 1).map((dj) => {
							if (
								(di == 0 && dj == 0) ||
								i + di < 0 ||
								i + di >= rolls.length ||
								j + dj < 0 ||
								j + dj >= row.length
							)
								return false;
							return rolls[i + di][j + dj] == PAPER_ROLL;
						})
					)
					.map(Number)
					.reduce(sum) < 4
			) {
				newRolls[i][j] = EMPTY_CELL;
				removedRolls++;
			}
		})
	);
	return { newRolls, removedRolls };
};

export const first = (s: string) => {
	return markRemovables(parse(s)).removedRolls;
};

export const second = (s: string) => {
	let results = 0;
	let rolls = parse(s);
	while (true) {
		const { newRolls, removedRolls } = markRemovables(rolls);
		if (removedRolls == 0) break;
		results += removedRolls;
		rolls = newRolls;
	}
	return results;
};

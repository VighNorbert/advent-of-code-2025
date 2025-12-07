import { sum } from './utils';

const START = 'S';
const SPLIT = '^';

export const first = (s: string) => {
	let rays: Set<number> = new Set();
	return s
		.split('\n')
		.map((line) => {
			let splits = 0;
			line.split('').map((c, i) => {
				if (c === START) rays.add(i);
				if (c === SPLIT && rays.has(i)) {
					splits++;
					rays.delete(i) && rays.add(i - 1) && rays.add(i + 1);
				}
			});
			return splits;
		})
		.reduce(sum);
};

export const second = (s: string) => {
	const worlds = [...Array(s.split('\n')[0].length)].map(() => 0);
	s.split('\n').map((line) =>
		line.split('').map((c, i) => {
			if (c === START) worlds[i] = 1;
			if (c === SPLIT && worlds[i] > 0) {
				worlds[i - 1] += worlds[i];
				worlds[i + 1] += worlds[i];
				worlds[i] = 0;
			}
		})
	);
	return worlds.reduce(sum);
};

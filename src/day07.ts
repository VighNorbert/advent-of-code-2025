import { distinct, sum } from './utils';

const START = 'S';
const SPLIT = '^';

export const first = (s: string) => {
	let rays: number[] = [];
	return s
		.split('\n')
		.map((line) => {
			let splits = 0;
			line.split('').map((c, i) => {
				if (c === START) rays.push(i);
				if (c === SPLIT && rays.includes(i)) {
					splits++;
					rays = [...rays.filter((r) => r !== i), i - 1, i + 1];
				}
			});
			return splits;
		})
		.reduce(sum);
};

export const second = (s: string) => {
	return s
		.split('\n')
		.reduce(
			(worlds, line) =>
				line.split('').reduce((w, c, i) => {
					if (c === START) w[i] = 1;
					if (c === SPLIT && w[i] > 0) {
						w[i - 1] += w[i];
						w[i + 1] += w[i];
						w[i] = 0;
					}
					return w;
				}, worlds),
			[...Array(s.split('\n')[0].length)].map(() => 0)
		)
		.reduce(sum);
};

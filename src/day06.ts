import { product, range, sum } from './utils';

export const first = (s: string) => {
	const lines = s.trim().split('\n');
	const inputs = lines
		.slice(0, -1)
		.map((line) => line.split(' ').filter(Boolean).map(Number));
	return [...lines]
		.reverse()[0]
		.split(' ')
		.filter(Boolean)
		.map((op, i) => {
			if (op == '+') return inputs.map((l) => l[i]).reduce(sum);
			return inputs.map((l) => l[i]).reduce(product, 1);
		})
		.reduce(sum);
};

const transpose = (inp: string[][]) => {
	let out: string[][] = [];
	range(0, inp[0].length - 1).forEach((col) => {
		out[col] = [];
		range(0, inp.length - 1).forEach((row) => {
			out[col][row] = inp[row][col];
		});
	});
	return out;
};

export const second = (s: string) => {
	return transpose(s.split('\n').map((line) => line.split('')))
		.map((line) => line.join('').trim())
		.join(',')
		.split(',,')
		.map((group) => group.split(','))
		.map((group) => ({
			op: group[0][group[0].length - 1],
			inputs: group
				.map((line, i) => (i === 0 ? line.slice(0, -1).trim() : line))
				.map(Number),
		}))
		.map(({ op, inputs }) => {
			if (op === '+') return inputs.reduce(sum);
			return inputs.reduce(product, 1);
		})
		.reduce(sum);
};

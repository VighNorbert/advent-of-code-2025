import { sum } from './utils';

type Case = { width: number; height: number; counts: number[] };

const parse = (s: string) =>
	s
		.trim()
		.split('\n\n')
		.at(-1)!
		.split('\n')
		.map((line) => line.split(/x|:?\s/).map(Number))
		.map(([width, height, ...counts]) => ({
			width,
			height,
			counts,
		})) as Case[];

export const first = (s: string) => parse(s).filter(
		(c) => c.counts.reduce(sum) * 9 <= c.width * c.height
	).length;

export const second = (_: string) => 0;

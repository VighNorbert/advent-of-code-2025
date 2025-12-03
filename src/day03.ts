import { max, sum, range } from './utils';

const parse = (s: string) => s.trim().split('\n');

export const maxJoltage = (s: string, count: number = 2) => {
	return parse(s)
		.map((line) => line.split('').map(Number))
		.map((nums) =>
			range(0, count - 1)
				.map((i) => {
					const a = nums
						.slice(0, nums.length - count + i + 1)
						.reduce(max);
					nums = nums.slice(nums.indexOf(a) + 1, nums.length);
					return a;
				})
				.reduce((acc, val) => acc * 10 + val, 0)
		)
		.reduce(sum, 0);
};

export const first = (s: string) => {
	return maxJoltage(s);
};

export const second = (s: string) => {
	return maxJoltage(s, 12);
};

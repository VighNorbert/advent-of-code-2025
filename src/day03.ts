import { max, sum } from './utils';

const parse = (s: string) => s.trim().split('\n');

export const maxJoltage = (s: string, count: number = 2) => {
	return parse(s)
		.map((line) => {
			let result = 0;
			let nums = line.split('').map(Number);
			for (let i = 0; i < count; i++) {
				result *= 10;
				const a = nums
					.slice(0, nums.length - count + i + 1)
					.reduce(max, -Infinity);
				result += a;
				const apos = nums.indexOf(a);
				nums = nums.slice(apos + 1, nums.length);
			}
			return result;
		})
		.reduce(sum, 0);
};

export const first = (s: string) => {
	return maxJoltage(s);
};

export const second = (s: string) => {
	return maxJoltage(s, 12);
};

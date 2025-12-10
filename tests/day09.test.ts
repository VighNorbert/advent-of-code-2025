import { first, second } from '../src/day09';

const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

test('day 09-1', () => {
	expect(first(input)).toBe(50);
});

test('day 09-2', () => {
	expect(second(input)).toBe(24);
});

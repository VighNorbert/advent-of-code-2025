import { first, second } from '../src/day05';

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

test('day 05-1', () => {
	expect(first(input)).toBe(3);
});

test('day 05-2', () => {
	expect(second(input)).toBe(14);
});

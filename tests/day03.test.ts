import { first, second } from '../src/day03';

const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

test('day 03-1', () => {
	expect(first(input)).toBe(357);
});

test('day 03-2', () => {
	expect(second(input)).toBe(3121910778619);
});

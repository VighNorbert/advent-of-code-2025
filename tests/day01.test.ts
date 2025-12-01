import { first, second } from '../src/day01';

const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

test('day 01-1', () => {
	expect(first(input)).toBe(3);
});

test('day 01-2', () => {
	expect(second(input)).toBe(6);
});

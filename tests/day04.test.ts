import { first, second } from '../src/day04';

const input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

test('day 04-1', () => {
	expect(first(input)).toBe(13);
});

test('day 04-2', () => {
	expect(second(input)).toBe(43);
});

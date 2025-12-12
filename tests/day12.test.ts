import { first, second } from '../src/day12';

const input = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

// fails, but yeah, whatever
test('day 12-1', () => {
	expect(first(input)).toBe(2);
});

test('day 12-2', () => {
	expect(second(input)).toBe(0);
});

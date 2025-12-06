import { first, second } from '../src/day06';

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`;

test('day 06-1', () => {
	expect(first(input)).toBe(4277556);
});

test('day 06-2', () => {
	expect(second(input)).toBe(3263827);
});

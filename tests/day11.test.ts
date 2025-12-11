import { first, second } from '../src/day11';

const input = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

test('day 11-1', () => {
	expect(first(input)).toBe(5);
});

const input2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

test('day 11-2', () => {
	expect(second(input2)).toBe(2);
});

import { Range, sum } from './utils';

const parse = (s: string) =>
	s
		.trim()
		.split('\n\n')
		.map((line) => line.split('\n'));

const parseRanges = (s: string[]): Range[] =>
	s
		.map((line) => line.split('-').map(Number))
		.map(([start, end]) => ({ start, end }));

const findRange = (num: number, ranges: Range[]) => {
	return ranges.findIndex((range) => num >= range.start && num <= range.end);
};
const mergeRanges = (...ranges: Range[]): Range => {
	return ranges.reduce(
		(acc, range) => ({
			start: Math.min(acc.start, range.start),
			end: Math.max(acc.end, range.end),
		}),
		{ start: Infinity, end: -Infinity }
	);
};

export const first = (s: string) => {
	const [baseRanges, numbers] = parse(s);
	const ranges = parseRanges(baseRanges);
	return numbers
		.map(Number)
		.map((num) => findRange(num, ranges))
		.filter((v) => v !== -1).length;
};

export const second = (s: string) => {
	let ranges: Range[] = [];
	parseRanges(parse(s)[0]).forEach((range) => {
		const si = findRange(range.start, ranges);
		const ei = findRange(range.end, ranges);
		if (si === -1 && ei === -1) {
			ranges = ranges.filter(
				(r) =>
					findRange(r.start, [range]) === -1 &&
					findRange(r.end, [range]) === -1
			);
			ranges.push(range);
		} else if (si === ei) {
			ranges[si] = mergeRanges(ranges[si], range);
		} else if (si !== -1 && ei !== -1) {
			ranges[si] = mergeRanges(ranges[si], ranges[ei], range);
			ranges.splice(ei, 1);
		} else if (si !== -1) {
			ranges[si] = mergeRanges(ranges[si], range);
		} else if (ei !== -1) {
			ranges[ei] = mergeRanges(ranges[ei], range);
		}
	});
	return ranges.map((range) => range.end - range.start + 1).reduce(sum);
};

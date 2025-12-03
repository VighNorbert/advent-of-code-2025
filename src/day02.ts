import { range, sum } from './utils';

const parse = (s: string) =>
	s
		.trim()
		.split(/[,\n]/)
		.filter(Boolean)
		.map((input) => input.split('-').map(Number));

const len = (num: number) => num.toString().length;

const nplicate = (num: number, n: number) => Number(String(num).repeat(n));

const duplicate = (num: number) => nplicate(num, 2);

export const first = (s: string) => {
	return parse(s)
		.flatMap(([start, end]) =>
			range(Math.ceil(len(start) / 2), Math.floor(len(end) / 2)).flatMap(
				(halfLength) => {
					const results: number[] = [];
					for (
						let part = Math.floor(start / 10 ** halfLength);
						duplicate(part) <= end;
						part++
					)
						if (duplicate(part) >= start)
							results.push(duplicate(part));
					return results;
				}
			)
		)
		.reduce(sum);
};

export const second = (s: string) => {
	return parse(s)
		.flatMap(([start, end]) => {
			const results = new Set<number>();
			range(len(start), len(end)).forEach((length) => {
				range(1, Math.floor(length / 2)).forEach((partLength) => {
					range(
						Math.max(2, Math.ceil(len(start) / partLength)),
						Math.floor(len(end) / partLength)
					).forEach((numParts) => {
						for (
							let part = 10 ** (partLength - 1);
							len(part) == partLength &&
							nplicate(part, numParts) <= end;
							part++
						) {
							if (nplicate(part, numParts) >= start)
								results.add(nplicate(part, numParts));
						}
					});
				});
			});
			return Array.from(results);
		})
		.reduce(sum);
};

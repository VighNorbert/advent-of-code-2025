export const min = (a: number, b: number) => Math.min(a, b);
export const max = (a: number, b: number) => Math.max(a, b);
export const sum = (a: number, b: number) => a + b;
export const diff = (a: number, b: number) => a - b;
export const minmax = (arr: number[]) => [arr.reduce(min), arr.reduce(max)];
export const range = (start: number, end: number) =>
	[...Array(end - start + 1)].map((_, i) => i + start);

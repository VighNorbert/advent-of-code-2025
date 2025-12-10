import { sum } from './utils';

import { Arith, Bool, init } from 'z3-solver';

const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split(/]\s\(|\)\s\{|}|\[/))
		.map(([_, lights, wirings, joltages]) => ({
			lights: lights
				.split('')
				.map((l, i) => (l === '#' ? 2 ** i : 0))
				.reduce(sum),
			schemas: wirings.split(') (').map((w) => w.split(',').map(Number)),
			joltages: joltages.split(',').map(Number),
		}));

const indexToBitmask = (indices: number[]) =>
	indices.map((n) => 2 ** n).reduce(sum);

const encode = (values: number[]) =>
	values.reduce((acc, curr) => acc * 100 + curr, 0);

export const first = (s: string) =>
	parse(s)
		.map(({ lights, schemas }) => {
			const schemaNums = schemas.map((s) => indexToBitmask(s));
			let options: number[] = [0];
			const nextOptions = new Set<number>();
			let steps = 0;
			while (true) {
				const current = options.shift();
				if (current === undefined) {
					steps++;
					options = Array.from(nextOptions);
					nextOptions.clear();
					continue;
				}
				if (current === lights) {
					break;
				}
				schemaNums.forEach((schema) => {
					nextOptions.add(current ^ schema);
				});
			}
			return steps;
		})
		.reduce(sum);

export const second = async (s: string) => {
	let result = 0;
	await Promise.all(
		parse(s).map(async ({ schemas, joltages }, i, arr) => {
			return init().then(async ({ Context }) => {
				const { Int, Optimize } = Context('day10-2-' + i);
				const opt = new Optimize();
				const variables = [];
				for (let i = 0; i < schemas.length; i++) {
					const value = Int.const(String.fromCodePoint(i + 97));
					opt.add(value.ge(0));
					variables.push(value);
				}

				for (let i = 0; i < joltages.length; i++) {
					let condition: Arith<string> | Bool<string> = Int.val(0);
					for (let j = 0; j < schemas.length; j++) {
						if (schemas[j].includes(i))
							condition = condition.add(variables[j]);
					}
					condition = condition.eq(Int.val(joltages[i]));
					opt.add(condition);
				}
				const sum = variables.reduce((a, x) => a.add(x), Int.val(0));
				opt.minimize(sum);
				if ((await opt.check()) == 'sat')
					result += parseInt(opt.model().eval(sum).toString());
			});
		})
	);
	return result;
};

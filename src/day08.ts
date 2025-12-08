import { product } from './utils';

const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split(',').map(Number))
		.map(([x, y, z], i) => ({ x, y, z, circuit: i }));

type NodeDistance = { from: number; to: number; distance: number };

const getDistances = (s: string) =>
	parse(s)
		.flatMap(
			(a, from, nodes) =>
				nodes
					.map((b, to) => {
						if (to <= from) return undefined;
						return {
							from,
							to,
							distance:
								Math.abs(b.x - a.x) ** 2 +
								Math.abs(b.y - a.y) ** 2 +
								Math.abs(b.z - a.z) ** 2,
						} as NodeDistance;
					})
					.filter((d) => d !== undefined) as NodeDistance[]
		)
		.sort((a, b) => a.distance - b.distance);

const reduceCircuits = (circuits: number[][], d: NodeDistance) => {
	const fromCircuit = circuits.findIndex((c) => c.includes(d.from));
	const toCircuit = circuits.findIndex((c) => c.includes(d.to));
	if (fromCircuit !== -1 && toCircuit !== -1) {
		if (fromCircuit !== toCircuit) {
			const merged = circuits[fromCircuit].concat(circuits[toCircuit]);
			circuits.splice(Math.max(fromCircuit, toCircuit), 1);
			circuits.splice(Math.min(fromCircuit, toCircuit), 1);
			circuits.push(merged);
		}
	} else if (fromCircuit >= 0) {
		circuits[fromCircuit].push(d.to);
	} else if (toCircuit >= 0) {
		circuits[toCircuit].push(d.from);
	} else {
		circuits.push([d.from, d.to]);
	}
	return circuits;
};

export const first = (s: string, n: number = 1000) =>
	getDistances(s)
		.slice(0, n)
		.reduce(reduceCircuits, [] as number[][])
		.map((c) => c.length)
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce(product, 1);

export const second = (s: string) => {
	const distances = getDistances(s);
	const nodes = parse(s);
	const circuits: number[][] = [];
	for (let d of distances) {
		reduceCircuits(circuits, d);
		if (circuits.length === 1 && circuits[0].length === nodes.length) {
			return nodes[d.from].x * nodes[d.to].x;
		}
	}
};

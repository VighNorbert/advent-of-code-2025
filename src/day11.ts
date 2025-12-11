import { sum } from './utils';

type Server = {
	label: string;
	to: string[];
};

const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split(': '))
		.map(([label, to]) => ({ label, to: to.split(' ') } as Server));

const dfs = (
	from: Server | undefined,
	servers: Server[],
	toLabel: string,
	visitedMap?: Map<string, number>
): number => {
	if (from === undefined) return 0;
	return from.to
		.map((nextLabel) => {
			if (nextLabel === toLabel) return 1;
			if (visitedMap?.has(nextLabel)) return visitedMap.get(nextLabel)!;
			const nextServer = servers.find((s) => s.label === nextLabel);
			const value = dfs(nextServer, servers, toLabel, visitedMap);
			visitedMap?.set(nextLabel, value);
			return value;
		})
		.reduce(sum);
};

const paths = (servers: Server[], fromLabel: string, toLabel: string) => {
	const visited = new Map<string, number>();
	const fromServer = servers.find((s) => s.label === fromLabel)!;
	return dfs(fromServer, servers, toLabel, visited);
};

export const first = (s: string) => paths(parse(s), 'you', 'out');

export const second = (s: string) => {
	const servers = parse(s);
	// if we could get from both dac->fft and fft->dac, then we have a cycle = infinite paths
	return (
		paths(servers, 'svr', 'fft') *
			paths(servers, 'fft', 'dac') *
			paths(servers, 'dac', 'out') +
		paths(servers, 'svr', 'dac') *
			paths(servers, 'dac', 'fft') *
			paths(servers, 'fft', 'out')
	);
};

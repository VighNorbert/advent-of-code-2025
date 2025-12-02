const parse = (s: string) => s.trim().split('\n');

export function first(s: string) {
	const data = parse(s);
	let result = 0;
	data.reduce((acc, x) => {
		if (x[0] === 'L') {
			acc -= Number(x.substring(1)) % 100;
		} else {
			acc += Number(x.substring(1)) % 100;
		}
		acc = (acc + 100) % 100;
		if (acc === 0) result++;
		return acc;
	}, 50);
	return result;
}

export function second(s: string) {
	const data = parse(s);
	let result = 0;
	data.reduce((acc, x) => {
		const steps = Number(x.substring(1));
		if (acc === 0 && x[0] === 'L') acc += 100;
		if (x[0] === 'L') {
			acc -= steps % 100;
		} else {
			acc += steps % 100;
		}
		result += Math.floor(steps / 100);
		if (acc <= 0 || acc >= 100) result++;
		acc = (acc + 100) % 100;
		return acc;
	}, 50);
	return result;
}

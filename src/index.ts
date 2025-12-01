import * as fs from 'fs';
import * as https from 'https';

const cookie = `session=${fs.readFileSync(`${__dirname}/../cookie`)}`;
const ua = 'User-Agent=AoC2025 Input reader 1.0';

const year = '2025';
const day = parseInt(process.argv[2], 10);
if (Number.isNaN(day) || day < 1 || day > 25) {
	console.error('You have to choose a day between 1 and 25');
	console.error('For example: node src/index.js 1');
	process.exit(1);
}

const d = day.toString().padStart(2, '0');

const type = process.argv[2].slice(-1) === '+' ? 'second' : 'first';
const file = `./src/day${d}.ts`;

if (!fs.existsSync(file)) {
	fs.writeFileSync(
		file,
		`const parse = (s: string) => s.trim().split('\\n');

export const function1 = (s: string) => {
\treturn 0;
};
exports.first = function1;

export const function2 = (s: string) => {
\treturn 0;
};
exports.second = function2;
`
	);
}

const testFile = `./tests/day${d}.test.ts`;

if (!fs.existsSync(testFile)) {
	fs.writeFileSync(
		testFile,
		`import { function1, function2 } from '../src/day${d}';

const input = \`\`;

test('day ${d}-1', () => {
\texpect(function1(input)).toBe(-1);
});

test('day ${d}-2', () => {
\texpect(function2(input)).toBe(-1);
});
`
	);
}

const callback = require(`./day${d}.ts`)[type];
const headers = { cookie, "user-agent": ua };
const inputFile = `${__dirname}/../input/day${day
	.toString()
	.padStart(2, '0')}.in`;

console.log(`https://adventofcode.com/${year}/day/${day}/input`)

try {
	const rawData = fs.readFileSync(inputFile, 'utf8');
	console.log(callback(rawData));
} catch (e) {
	https.get(
		`https://adventofcode.com/${year}/day/${day}/input`,
		{ headers },
		(res) => {
			let rawData = '';
			res.setEncoding('utf8');
			res.on('data', (chunk) => {
				rawData += chunk;
			});
			res.on('end', () => {
				fs.writeFileSync(inputFile, rawData);
				console.log('File written');
				console.log(callback(rawData));
			});
		}
	);
}

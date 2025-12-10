import { max } from './utils';

type Point = {
	x: number;
	y: number;
};

type Segment = {
	start: Point;
	end: Point;
};

type Line = Segment;

type Rectangle = {
	a: Point;
	b: Point;
};

const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split(',').map(Number))
		.map(([x, y]) => ({ x, y } as Point));

const area = (rect: Rectangle) =>
	(Math.abs(rect.a.x - rect.b.x) + 1) * (Math.abs(rect.a.y - rect.b.y) + 1);

export const first = (s: string) =>
	parse(s)
		.flatMap((a, _, tiles) => tiles.map((b) => area({ a, b })))
		.reduce(max);

const isLineIntersectingRect = (
	line: Line,
	rect: Rectangle,
	axis: (p: Point) => number
) =>
	axis(line.start) === axis(line.end) &&
	axis(line.start) > Math.min(axis(rect.a), axis(rect.b)) &&
	axis(line.start) < Math.max(axis(rect.a), axis(rect.b));

const isSegmentIntersectingRect1D = (
	line: Segment,
	rect: Rectangle,
	axis: (p: Point) => number
) =>
	Math.max(
		Math.min(axis(rect.a), axis(rect.b)),
		Math.min(axis(line.start), axis(line.end))
	) <
	Math.min(
		Math.max(axis(rect.a), axis(rect.b)),
		Math.max(axis(line.start), axis(line.end))
	);

const isSegmentIntersectingRect = (line: Segment, rect: Rectangle) =>
	(isLineIntersectingRect(line, rect, (p) => p.x) &&
		isSegmentIntersectingRect1D(line, rect, (p) => p.y)) ||
	(isLineIntersectingRect(line, rect, (p) => p.y) &&
		isSegmentIntersectingRect1D(line, rect, (p) => p.x));

export const second = (s: string) =>
	parse(s)
		.flatMap((a, ia, tiles) =>
			tiles.map((b, ib) =>
				ib < ia ||
				tiles.some((c, i) =>
					isSegmentIntersectingRect(
						{
							start: c,
							end:
								i === tiles.length - 1
									? tiles[0]
									: tiles[i + 1],
						},
						{ a, b }
					)
				)
					? 0
					: area({ a, b })
			)
		)
		.reduce(max);

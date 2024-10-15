import { useEffect, useRef, useState } from "react";

const isOverlapping = (rect1: DOMRect, rect2: DOMRect): boolean => {
	return !(
		rect1.x + rect1.width < rect2.x ||
		rect2.x + rect2.width < rect1.x ||
		rect1.y + rect1.height < rect2.y ||
		rect2.y + rect2.height < rect1.y
	);
};

const SvgTextComponent = ({ texts, gap = 40 }: { texts: string[]; gap?: number }) => {
	const [yPositions, setYPositions] = useState<number[]>(new Array(texts.length).fill(0));
	const textRefs = useRef<(SVGTextElement | null)[]>(new Array(texts.length).fill(null));

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (textRefs.current.some((ref) => ref === null)) {
			return;
		}
		const yPosArray: number[] = [];
		// const bboxes = textRefs.current
		// 	.filter((ref): ref is SVGTextElement => ref !== null)
		// 	.map((ref) => ref.getBoundingClientRect());
		const bboxes = textRefs.current
			.filter((ref): ref is SVGTextElement => ref !== null)
			.map((ref) => ref.getBBox());
		// console.log({ bboxes });

		for (let n = 0; n < 2; n++) {
			// 2パス繰り返す
			for (let i = 1; i < bboxes.length; i++) {
				const currentBBox = bboxes[i];
				if (currentBBox) {
					for (let j = 0; j < i; j++) {
						const prevBBox = bboxes[j];
						if (isOverlapping(currentBBox, prevBBox)) {
							currentBBox.y = prevBBox.y + prevBBox.height;
						}
					}
				}
			}
		}
		// console.log({ bboxes });

		const offsetY = yPositions[0] - bboxes[0].y;
		for (const bbox of bboxes) {
			if (bbox) {
				yPosArray.push(bbox.y + offsetY);
			}
		}
		setYPositions(yPosArray);
	}, []);

	const w = 400;
	const h = 120;
	const s = 1; // for DEBUG

	return (
		<svg width={w} height={h} viewBox={`0 0 ${w * s} ${h * s}`}>
			<title>SvgTextComponent</title>
			<rect x="0" y="0" width={w * s} height={h * s} fill="#eeeeee" />
			{texts.map((text, index) => (
				<text
					key={`${index}${text}`}
					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
					ref={(el) => (textRefs.current[index] = el)}
					x={gap * s * index} // 各テキストを少し右にずらす例
					y={yPositions[index]} // 計算したy座標を適用
					textAnchor="left"
					fontSize={16 * s}
					dy="1em"
				>
					{text}
				</text>
			))}
		</svg>
	);
};

function App() {
	const texts = ["*", "Hello", "World", "React", "SVG"];
	return (
		<>
			<h1>7. 重なるテキストをずらす</h1>
			<div>
				<SvgTextComponent texts={texts} />
			</div>
			<div>
				<SvgTextComponent texts={texts} gap={30} />
			</div>
			<div>
				<SvgTextComponent texts={texts} gap={25} />
			</div>
			<div>
				<SvgTextComponent texts={texts} gap={20} />
			</div>
			<div>
				<SvgTextComponent texts={texts} gap={10} />
			</div>
			<div>
				<SvgTextComponent texts={texts} gap={5} />
			</div>
		</>
	);
}

export default App;

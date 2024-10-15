import { useEffect, useRef, useState } from "react";

const isOverlapping = (rect1: SVGRect, rect2: SVGRect): boolean => {
	return !(
		rect1.x + rect1.width < rect2.x ||
		rect2.x + rect2.width < rect1.x ||
		rect1.y + rect1.height < rect2.y ||
		rect2.y + rect2.height < rect1.y
	);
};

const SvgTextComponent = ({ texts }: { texts: string[] }) => {
	const [yPositions, setYPositions] = useState<number[]>(new Array(texts.length).fill(20));
	const textRefs = useRef<(SVGTextElement | null)[]>([]);

	useEffect(() => {
		if (textRefs.current.length > 0) {
			const yPosArray: number[] = [];
			const bboxes = textRefs.current.map((ref) => ref?.getBBox());
			console.log({ bboxes });
			for (let i = 1; i < bboxes.length; i++) {
				const currentBBox = bboxes[i];
				const prevBBox = bboxes[i - 1];
				if (currentBBox && prevBBox) {
					if (isOverlapping(currentBBox, prevBBox)) {
						currentBBox.y += prevBBox.height;
					}
				}
			}
			console.log({ bboxes });
			const offsetY = yPositions[0] - bboxes[0]!.y;
			for (const bbox of bboxes) {
				if (bbox) {
					yPosArray.push(bbox.y + offsetY); // アンカーが何処にあるかによって変わる
				}
			}
			setYPositions(yPosArray);
		}
	}, []);

	return (
		<svg width="400" height="120">
			<title>SvgTextComponent</title>
			<rect x="0" y="0" width="400" height="120" fill="lightgray" />
			{texts.map((text, index) => (
				<text
					key={`${index}${text}`}
					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
					ref={(el) => (textRefs.current[index] = el)}
					x={20 * index} // 各テキストを少し右にずらす例
					y={yPositions[index]} // 計算したy座標を適用
					fill="black"
					textAnchor="left"
					fontSize="16"
				>
					{text}
				</text>
			))}
		</svg>
	);
};

function App() {
	return (
		<>
			<h1>7. 重なるテキストをずらす</h1>
			<SvgTextComponent texts={["*", "Hello", "World", "React", "SVG"]} />
		</>
	);
}

export default App;

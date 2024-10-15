import { useEffect, useRef, useState } from "react";

const SvgTextComponent = ({ texts }: { texts: string[] }) => {
	const [yPositions, setYPositions] = useState<number[]>([]);
	const textRefs = useRef<(SVGTextElement | null)[]>([]);

	useEffect(() => {
		// 各textのバウンディングボックスを取得し、y座標を計算
		if (textRefs.current.length > 0) {
			const yPosArray: number[] = [];
			let currentY = 20; // 最初のテキストの初期y座標

			textRefs.current.forEach((ref, index) => {
				if (ref) {
					const bbox = ref.getBBox();
					yPosArray[index] = currentY;
					currentY += bbox.height; // 次のテキストのy座標を更新
				}
			});
			setYPositions(yPosArray);
		}
	}, []);

	return (
		<svg width="400" height="100">
			<title>SvgTextComponent</title>
			{texts.map((text, index) => (
				<text
					key={`${index}${text}`}
					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
					ref={(el) => (textRefs.current[index] = el)}
					x={60 * index} // 各テキストを少し右にずらす例
					y={yPositions[index] || 0} // 計算したy座標を適用
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
			<SvgTextComponent texts={["Hello", "World", "React", "SVG"]} />
		</>
	);
}

export default App;

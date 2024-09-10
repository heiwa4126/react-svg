import { SVG, type Svg } from "@svgdotjs/svg.js";
import "./App.css";

/**
 * サンプル用にバングラデシュの国旗みたいなSVGを作る関数
 * @returns svg.jsのSvgオブジェクト。.svg()でSVG文字列を取得できる
 */
function getSvgEx1(): Svg {
	const width = 320;
	const height = 180;
	const diameter = 100;

	const draw = SVG().size(width, height);
	draw.rect(width, height).fill("#0f0"); // SVGには背景色という観念がない
	draw
		.circle(diameter)
		.fill("#f00")
		.center(width / 2, height / 2);

	draw
		.text("Hello, SVG.js!")
		.font({
			family: "Arial",
			size: 45,
			anchor: "middle",
			leading: "1.5em",
		})
		.fill("#00f")
		.cx(width / 2)
		.cy(height / 2);

	draw // monospace test
		.text("monospace font")
		.font({
			family: "Consolas, Menlo, monospace",
			size: 30,
			anchor: "middle",
			leading: "1.0em",
		})
		.fill("#fff")
		.cx(width / 2)
		.cy(height / 2 + 36);

	return draw;
}

/**
 * svg.jsのSvgオブジェクトを描画するためのコンポーネント
 * dangerouslySetInnerHTMLを使っているので1か所にまとめてある
 * @param src - The SVG object to render.
 */
function SvgComponent({ src }: { src: Svg }) {
	// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
	return <div dangerouslySetInnerHTML={{ __html: src.svg() }} />;
}

function App() {
	const svg1 = getSvgEx1();

	return (
		<>
			<h1>1. 動的にSVGを作って描画する</h1>
			<p>SVGは変化しないものとする</p>
			<SvgComponent src={svg1} />
		</>
	);
}

export default App;

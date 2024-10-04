import { SVG, type Svg } from "@svgdotjs/svg.js";
import "./App.css";
import SvgEx3 from "./assets/svgex3.svg";

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

/**
 * getSvgEx1()と同じSVGをJSXで記述したもの。コピペじゃダメでちょっと修正が必要
 * @returns　SVGを描画するコンポーネント
 */
function SvgEx2() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="320"
			height="180"
		>
			<title>SVG Example 2</title>
			<rect width="320" height="180" fill="#00ff00" />
			<circle r="50" cx="160" cy="90" fill="#ff0000" />
			<text
				fontFamily="Arial"
				fontSize={45}
				textAnchor="middle"
				fill="#0000ff"
				data-svgjs="{&quot;leading&quot;:&quot;1.5em&quot;}"
				x="160"
				y="105.5"
			>
				<tspan dy="0" x="160">
					Hello, JSX!
				</tspan>
			</text>
			<text
				fontFamily="Consolas, Menlo, monospace"
				fontSize="30"
				textAnchor="middle"
				fill="#ffffff"
				data-svgjs="{&quot;leading&quot;:&quot;1em&quot;}"
				x="160"
				y="136"
			>
				<tspan dy="0" x="160">
					monospace font
				</tspan>
			</text>
		</svg>
	);
}

function App() {
	const svg1 = getSvgEx1();

	return (
		<>
			<h1>1. 動的にSVGを作って描画する</h1>
			<h2>SVG文字列を生成して dangerouslySetInnerHTML で埋め込む</h2>
			<SvgComponent src={svg1} />
			<p>生でSVGを生成するよりはすこし楽</p>
			<h2>JSX/TSXコンポーネントとして扱う</h2>
			<SvgEx2 />
			<p>一番Reactっぽいけどめんどくさい。他のフレームワークに応用できない</p>
			<h2>imgのソースファイル</h2>
			<div>
				<img src={SvgEx3} alt="SVG Ex3" />
			</div>
			<p>動的じゃない</p>
		</>
	);
}

export default App;

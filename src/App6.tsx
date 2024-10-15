import { renderToStaticMarkup } from "react-dom/server";

function Svgex1() {
	return (
		<svg width="300" height="256">
			<title>Example 1</title>
			<rect width="256" height="256" fill="green" />
			<rect x={50} y={50} width="100" height="100" fill="red" />
		</svg>
	);
}
function Svgex2() {
	return (
		<svg width="300" height="256">
			<title>Example 2</title>
			<rect width="256" height="256" fill="green">
				<rect x={50} y={50} width="100" height="100" fill="red" />
			</rect>
		</svg>
	);
}

function App() {
	const s1 = Svgex1();
	const s2 = Svgex2();

	return (
		<>
			<h1>6. SVGでは基本要素はネストできない</h1>
			<div>
				{s1}
				{s2}
			</div>
			<div>
				<h2>left:</h2>
				<code>{renderToStaticMarkup(s1)}</code>
			</div>
			<div>
				<h2>right:</h2>
				<code>{renderToStaticMarkup(s2)}</code>
			</div>
		</>
	);
}

export default App;

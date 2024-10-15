import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import App1 from "./App1";
import App2 from "./App2";
import App3 from "./App3";
import App4 from "./App4";
import App5 from "./App5";
import App6 from "./App6";
import App7 from "./App7";
import App8 from "./App8";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<App8 />} />
				<Route path="/index.html" element={<App8 />} />
				{/* ↑デフォルトアプリ */}
				<Route path="/1" element={<App1 />} />
				<Route path="/2" element={<App2 />} />
				<Route path="/3" element={<App3 />} />
				<Route path="/4" element={<App4 />} />
				<Route path="/5" element={<App5 />} />
				<Route path="/6" element={<App6 />} />
				<Route path="/7" element={<App7 />} />
				<Route path="/8" element={<App8 />} />
			</Routes>
			<Links />
		</>
	);
}

export function Links() {
	return (
		<ol reversed>
			<li>
				<Link to="/8">重なるテキストをずらす(2)</Link>
			</li>
			<li>
				<Link to="/7">重なるテキストをずらす</Link>
			</li>
			<li>
				<Link to="/6">SVGでは基本要素はネストできない</Link>
			</li>
			<li>
				<Link to="/5">ChromeのSVGでtextが変</Link>
			</li>
			<li>
				<Link to="/4">スケジュール図をSVGで書いてみる</Link>
			</li>
			<li>
				<Link to="/3">SVGを画像にオーバーレイしてみる(2)</Link>
			</li>
			<li>
				<Link to="/2">SVGを画像にオーバーレイしてみる</Link>
			</li>
			<li>
				<Link to="/1">動的にSVGを作って描画する</Link>
			</li>
		</ol>
	);
}

export default App;

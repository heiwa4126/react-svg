import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import App1 from "./App1";
import App2 from "./App2";
import App3 from "./App3";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<App3 />} />
				<Route path="/index.html" element={<App3 />} />
				{/* ↑デフォルトアプリ */}
				<Route path="/1" element={<App1 />} />
				<Route path="/2" element={<App2 />} />
				<Route path="/3" element={<App3 />} />
			</Routes>
			<Links />
		</>
	);
}

export function Links() {
	return (
		<ol>
			<li>
				<Link to="/1">動的にSVGを作って描画する</Link>
			</li>
			<li>
				<Link to="/2">SVGを画像にオーバーレイしてみる</Link>
			</li>
			<li>
				<Link to="/3">SVGを画像にオーバーレイしてみる(2)</Link>
			</li>
		</ol>
	);
}

export default App;

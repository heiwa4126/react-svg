function App() {
	return (
		<>
			<h1>5. ChromeのSVGでtextが変</h1>
			<svg width="320" height="180">
				<title>SVG Example 2</title>
				<rect width="320" height="180" fill="#00ff00" />
				<text
					fontFamily="Arial"
					fontSize={45}
					textAnchor="middle"
					fill="#0000ff"
					x="160"
					y="105.5"
					style={{ fontKerning: "none" }}
				>
					yy年mm月
				</text>
			</svg>
			<p>
				Chrome で SVG の <code>25年1月</code> が <code>25 年 1 月</code>のように表示される
				(英数字と漢字の間に余分な文字間が挿入される)。 Edge と Firefox は期待通り表示される。
			</p>
			<p>なんか環境依存っぽいなあ... 困った</p>
		</>
	);
}

export default App;

import Qr5 from "./assets/qr5.jpg";

function App() {
	return (
		<>
			<h1>2. SVGを画像にオーバーレイしてみる</h1>
			<div style={{ position: "relative", width: "fit-content" }}>
				<img
					src={Qr5}
					alt="QRCode Example No.5 (3024 x 1935)"
					style={{ display: "block", width: "640px", height: "auto" }}
				/>
				<svg
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
					}}
					viewBox="0 0 3024 1935"
					preserveAspectRatio="none"
				>
					<title>svg</title>
					<circle cx="500" cy="500" r="400" fill="rgba(255, 0, 0, 0.2)" />
					<rect x="200" y="200" width="600" height="600" fill="rgba(0, 0, 255, 0.2)" />
				</svg>
			</div>
		</>
	);
	/* メモ
	1. 親のdiv要素にposition: relativeを設定し、SVGの絶対位置指定の基準点とします。
	2. img 要素は通常通り配置され、サイズを指定しています。
	3. svg 要素は position: absoluteで配置され、top: 0とleft: 0で画像の左上角に合わせています。
  4. SVGのwidthとheightを100%に設定し、画像全体をカバーするようにしています。
  5. viewBox属性とSVG内の要素の座標を使って、オーバーレイの内容を制御します。
	6. preserveAspectRatio="none"を使用して、SVGが画像のアスペクト比に関係なく引き伸ばされるようにしています。
	*/
}

export default App;

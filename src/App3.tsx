import Qr5 from "./assets/qr5.jpg";

type Position = {
	topLeft: { x: number; y: number };
	topRight: { x: number; y: number };
	bottomRight: { x: number; y: number };
	bottomLeft: { x: number; y: number };
};

type Data = {
	text: string;
	position: Position;
};

/** ZXingでQRコードをスキャンした結果だけ抜き出したもの */
const data1: Data[] = [
	{
		text: "8004030045006",
		position: {
			topLeft: { x: 2322, y: 517 },
			topRight: { x: 2057, y: 390 },
			bottomRight: { x: 2228, y: 315 },
			bottomLeft: { x: 2485, y: 429 },
		},
	},
	{
		text: "7501031311309",
		position: {
			topLeft: { x: 1134, y: 1080 },
			topRight: { x: 801, y: 1323 },
			bottomRight: { x: 444, y: 1107 },
			bottomLeft: { x: 795, y: 894 },
		},
	},
	{
		text: "4006381333931",
		position: {
			topLeft: { x: 2127, y: 1296 },
			topRight: { x: 2034, y: 1632 },
			bottomRight: { x: 1518, y: 1461 },
			bottomLeft: { x: 1674, y: 1155 },
		},
	},
];

function SvgQr({ item }: { item: Data }) {
	const p = item.position;
	return (
		<>
			<polygon
				points={`${p.topLeft.x},${p.topLeft.y} ${p.topRight.x},${p.topRight.y} ${p.bottomRight.x},${p.bottomRight.y} ${p.bottomLeft.x},${p.bottomLeft.y}`}
				fill="rgba(0, 255, 0, 0.4)"
				stroke="none"
				strokeWidth="10"
			/>
			<text
				fontFamily="Arial"
				fontSize={60}
				textAnchor="middle"
				x={(p.topLeft.x + p.bottomRight.x) / 2}
				y={(p.topLeft.y + p.bottomRight.y) / 2 + 30}
				fill="Red"
			>
				{item.text}
			</text>
		</>
	);
}

function SvgQRs({ width, height, data }: { width: number; height: number; data: Data[] }) {
	if (data.length === 0) return <></>;

	return (
		<svg
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
			}}
			viewBox={`0 0 ${width} ${height}`}
			preserveAspectRatio="none"
		>
			<title>svg</title>
			{data.map((item, index) => (
				<SvgQr item={item} key={`${index}${item.text}`} />
			))}
		</svg>
	);
}

function App() {
	return (
		<>
			<h1>3. SVGを画像にオーバーレイしてみる (2)</h1>
			<div style={{ position: "relative", width: "fit-content" }}>
				<img
					src={Qr5}
					alt="QRCode Example No.5 (3024 x 1935)"
					style={{ display: "block", width: "800px", height: "auto" }}
				/>
				<SvgQRs width={3024} height={1935} data={data1} />
			</div>
		</>
	);
}

export default App;

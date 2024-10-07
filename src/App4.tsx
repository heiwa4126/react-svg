import PptxGenJS from "pptxgenjs";
import { forwardRef, useRef } from "react";
import { type Schedule, type ScheduleData, getRenderRange, scheduleData1 } from "./Schedule";

const ADay = 24; // 1日の時間数
const AYear = ADay * 365.25; // 1年の時間数

function getHour(date: Date): number {
	// date.getTime()はミリ秒なので、時間に変換する
	return date.getTime() / (60 * 60 * 1000);
}

class SvgScheduleTask {
	private data: ScheduleData;
	private renderStartDate: Date;
	private renderEndDate: Date;
	private offsetX: number;
	private taskOffsetY: number;
	private duration: number;
	private dateHeight: number;
	private taskHeight: number;
	private taskGap: number;
	private tasksHeight: number;

	constructor(data: ScheduleData) {
		this.data = data;

		const { renderStartDate, renderEndDate } = getRenderRange(data);
		this.renderStartDate = renderStartDate;
		this.renderEndDate = renderEndDate;
		const rows = data.scheduleGroups.length;

		// とりあえずHour単位でいく。あとで変えるかもしれない
		this.offsetX = getHour(renderStartDate);
		this.duration = getHour(renderEndDate) + ADay - getHour(renderStartDate);
		// 幅が変わっても高さはあまり変わらないようにするポリシー
		this.dateHeight = ((AYear / 24) * (this.duration / AYear)) / 2;
		this.taskHeight = (AYear / 24) * (this.duration / AYear);
		this.taskOffsetY = 1 + this.dateHeight;
		this.taskGap = this.taskHeight / 10;
		this.tasksHeight =
			this.taskOffsetY + (this.taskHeight + this.taskGap) * rows - this.taskGap + 2;
	}

	getDimensions = () => {
		return {
			width: this.duration,
			height: this.tasksHeight,
		};
	};

	private SvgTask = ({ data, row = 0 }: { data: Schedule; row?: number }) => {
		const start = getHour(data.startDate);

		const width = getHour(data.endDate) - start + ADay;
		const height = this.taskHeight;
		const x = start - this.offsetX;
		const y = (this.taskHeight + this.taskGap) * row + this.taskOffsetY;

		return (
			<g>
				<rect
					{...{ width, height, x, y }}
					fill="#c8c8fa"
					stroke="black"
					strokeWidth="1"
					vectorEffect="non-scaling-stroke"
				/>
				<text
					x={x + width / 2}
					y={y + height / 2}
					fontSize={height / 3}
					dy="0.3em"
					className="pname"
				>
					{data.process}
				</text>
			</g>
		);
	};

	SvgSchedule = forwardRef<SVGSVGElement>((_, ref) => {
		const w = this.duration;
		const h = this.tasksHeight;

		return (
			<svg ref={ref} viewBox={`0 0 ${w} ${h}`}>
				<title>schedule svg</title>
				<style>
					{`
						.pname {font-family: Arial;	font-style: italic;	font-weight: bold; text-anchor: middle; fill: black;}
					`}
				</style>
				<rect width={w} height={h} fill="#f2f2f2" />
				{/* <circle r={h * 0.35} cx={w / 2} cy={h / 2} fill="#dddddd" /> */}
				{Array.from({
					length: Math.ceil(
						(this.renderEndDate.getTime() - this.renderStartDate.getTime()) /
							(30 * 24 * 60 * 60 * 1000),
					),
				}).map((_, index) => {
					const monthStart = new Date(this.renderStartDate.getTime());
					console.log(monthStart);
					monthStart.setMonth(this.renderStartDate.getMonth() + index);
					const x = getHour(monthStart) - this.offsetX;
					return (
						<line
							key={index}
							x1={x}
							y1={0}
							x2={x}
							y2={h}
							stroke="black"
							strokeWidth="1"
							vectorEffect="non-scaling-stroke"
						/>
					);
				})}

				{this.data.scheduleGroups.map((group, rowIndex) =>
					group.schedules.map((schedule) => (
						<this.SvgTask key={`${rowIndex}-${schedule.process}`} row={rowIndex} data={schedule} />
					)),
				)}
			</svg>
		);
	});
}

// Base64エンコーディング関数
const toBase64 = (str: string) => {
	const bytes = new TextEncoder().encode(str);
	let binary = "";
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
};

function App() {
	const svgRef = useRef<SVGSVGElement>(null);

	const handleCopyToClipboard = () => {
		if (svgRef.current) {
			const svgElement = svgRef.current;
			const serializer = new XMLSerializer();
			const svgString = serializer.serializeToString(svgElement);

			navigator.clipboard.writeText(svgString).then(
				() => {
					alert("SVG copied to clipboard!");
				},
				(err) => {
					console.error("Failed to copy: ", err);
				},
			);
		}
	};

	const handleDownloadSvg = () => {
		if (svgRef.current) {
			const svgElement = svgRef.current;
			const serializer = new XMLSerializer();
			const svgString = serializer.serializeToString(svgElement);

			// Blobを使ってSVGファイルを生成
			const blob = new Blob([svgString], { type: "image/svg+xml" });
			const url = URL.createObjectURL(blob);

			// <a>タグを生成して自動的にダウンロードを開始
			const link = document.createElement("a");
			link.href = url;
			link.download = "schedule.svg"; // ダウンロードするファイル名
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// メモリリーク防止のため、URLを解放
			URL.revokeObjectURL(url);
		}
	};

	const handleDownloadPptx = () => {
		if (svgRef.current) {
			const svgElement = svgRef.current;
			const serializer = new XMLSerializer();
			const svgString = serializer.serializeToString(svgElement);
			const pptx = new PptxGenJS();

			// 新しいスライドを追加
			const slide = pptx.addSlide();

			// SVGをBase64に変換
			const svgBase64 = `data:image/svg+xml;base64,${toBase64(svgString)}`;

			// SVGの幅と高さを取得。今srから直にとったけど、SVGから取るように変更する
			const { width, height } = sr.getDimensions();
			const w = 8;
			const h = (w * height) / width;

			// Base64画像をスライドに追加
			slide.addImage({
				data: svgBase64,
				x: 1,
				y: 1,
				w: w, // 幅
				h: h, // 高さ
			});

			// PPTXファイルをダウンロード
			pptx.writeFile({ fileName: "schedule.pptx" });
		}
	};

	const sr = new SvgScheduleTask(scheduleData1);
	return (
		<>
			<h1>4. スケジュール図をSVGで書いてみる</h1>
			<div>
				<sr.SvgSchedule ref={svgRef} />
			</div>
			<div>
				<button type="button" onClick={handleDownloadPptx}>
					PPTファイルをダウンロード
				</button>{" "}
				<button type="button" onClick={handleDownloadSvg}>
					SVGファイルをダウンロード
				</button>{" "}
				<button type="button" onClick={handleCopyToClipboard}>
					クリップボードにSVG(as text)としてコピー
				</button>
			</div>
		</>
	);
}

export default App;

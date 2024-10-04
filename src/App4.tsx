import { type Schedule, type ScheduleData, getRenderRange, scheduleData1 } from "./Schedule";

const ADay = 24; // 1日の時間数
const AYear = ADay * 365.25; // 1年の時間数

function getHour(date: Date): number {
	// date.getTime()はミリ秒なので、時間に変換する
	return date.getTime() / (60 * 60 * 1000);
}

class SvgScheduleTask {
	private data: ScheduleData;
	private offsetX: number;
	private offsetY: number;
	private duration: number;
	private taskHeight: number;
	private taskGap: number;
	private tasksHeight: number;

	constructor(data: ScheduleData) {
		this.data = data;

		const { renderStartDate, renderEndDate } = getRenderRange(data);
		const rows = data.scheduleGroups.length;

		// とりあえずHour単位でいく。あとで変えるかもしれない
		this.offsetX = getHour(renderStartDate);
		this.offsetY = 1;
		this.duration = getHour(renderEndDate) + ADay - getHour(renderStartDate);
		// 幅が変わっても高さはあまり変わらないようにするポリシー
		this.taskHeight = (AYear / 24) * (this.duration / AYear);
		this.taskGap = this.taskHeight / 10;
		this.tasksHeight = (this.taskHeight + this.taskGap) * rows - this.taskGap + 2;
	}

	SvgSchedule = () => {
		const w = this.duration;
		const h = this.tasksHeight;

		return (
			<svg viewBox={`0 0 ${w} ${h}`}>
				<title>schedule svg</title>
				<style>
					{`
						.pname {font-family: Arial;	font-style: italic;	font-weight: bold; text-anchor: middle; fill: black;}
					`}
				</style>
				<rect width={w} height={h} fill="#f2f2f2" />
				{/* <circle r={h * 0.35} cx={w / 2} cy={h / 2} fill="#dddddd" /> */}
				<this.SvgTask data={this.data.scheduleGroups[0].schedules[0]} />
				<this.SvgTask data={this.data.scheduleGroups[0].schedules[1]} />
				<this.SvgTask data={this.data.scheduleGroups[0].schedules[2]} />
				<this.SvgTask data={this.data.scheduleGroups[0].schedules[3]} />
				<this.SvgTask row={1} data={this.data.scheduleGroups[1].schedules[0]} />
				<this.SvgTask row={1} data={this.data.scheduleGroups[1].schedules[1]} />
				<this.SvgTask row={1} data={this.data.scheduleGroups[1].schedules[2]} />
				<this.SvgTask row={2} data={this.data.scheduleGroups[2].schedules[0]} />
				<this.SvgTask row={2} data={this.data.scheduleGroups[2].schedules[1]} />
			</svg>
		);
	};

	private SvgTask = ({ data, row = 0 }: { data: Schedule; row?: number }) => {
		const start = getHour(data.startDate);

		const width = getHour(data.endDate) - start + ADay;
		const height = this.taskHeight;
		const x = start - this.offsetX;
		const y = (this.taskHeight + this.taskGap) * row + this.offsetY;

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
}

function App() {
	const sr = new SvgScheduleTask(scheduleData1);
	return (
		<>
			<h1>4. スケジュール図をSVGで書いてみる</h1>
			<div>
				<sr.SvgSchedule />
			</div>
		</>
	);
}

export default App;

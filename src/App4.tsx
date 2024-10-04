import { type Schedule, type ScheduleData, getRenderRange, scheduleData1 } from "./Schedule";

const ADay = 60 * 60 * 24 * 1000; // 1日のミリ秒数

function SvgTask({ data, offsetX }: { data: Schedule; offsetX: number }) {
	const start = data.startDate.getTime();
	const duration = (data.endDate.getTime() - start + ADay) / 1000;
	return <rect width={duration} height={1000000} cx={start / 1000 - offsetX} fill="#00eeee" />;
}

function SvgSchedule({ data }: { data: ScheduleData }) {
	const { renderStartDate, renderEndDate } = getRenderRange(data);
	// console.log({ renderStartDate, renderEndDate });

	// note: とりあえず秒でいくけど、あとで考慮する
	const offsetX = renderStartDate.getTime() / 1000;
	const duration = (renderEndDate.getTime() + ADay - renderStartDate.getTime()) / 1000;
	console.log({ offsetX, duration });

	// const width = 65536; // 最初は適当な値で
	const width = duration; // 最初は適当な値で
	const height = duration / 3;

	return (
		<svg viewBox={`0 0 ${width} ${height}`}>
			<title>schedule svg</title>
			<rect width={width} height={height} fill="#eeeeee" />
			<circle r={height * 0.35} cx={width / 2} cy={height / 2} fill="#dddddd" />
			<SvgTask offsetX={offsetX} data={data.scheduleGroups[0].schedules[0]} />
		</svg>
	);
}

function App() {
	return (
		<>
			<h1>4. スケジュール図を書いてみる</h1>
			<div>
				<SvgSchedule data={scheduleData1} />
			</div>
		</>
	);
}

export default App;

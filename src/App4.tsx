import { type ScheduleData, scheduleData1 } from "./Schedule";

function SvgSchedule({ data }: { data: ScheduleData }) {
	const width = 65536; // 最初は適当な値で
	const height = 1800;




	return (
		<svg viewBox={`0 0 ${width} ${height}`}>
			<title>schedule svg</title>
			<rect width={width} height={height} fill="#eeeeee" />
			<circle r={height * 0.35} cx={width / 2} cy={height / 2} fill="#dddddd" />
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

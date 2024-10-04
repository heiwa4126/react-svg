import Color from "color";

interface ScheduleRaw {
	process: string;
	startDate: string;
	endDate: string;
	backgroundColor?: string;
	textColor?: string;
}

interface ScheduleGroupRaw {
	groupName: string;
	schedules: ScheduleRaw[];
}

interface ScheduleDataRaw {
	startDate?: string;
	endDate?: string;
	today?: string;
	scheduleGroups: ScheduleGroupRaw[];
}

export interface Schedule {
	process: string;
	startDate: Date;
	endDate: Date;
	backgroundColor?: Color;
	textColor?: Color;
}

export interface ScheduleGroup {
	groupName: string;
	schedules: Schedule[];
}

export interface ScheduleData {
	startDate?: Date;
	endDate?: Date;
	today?: Date;
	scheduleGroups: ScheduleGroup[];
}

export function convertToDate(input: string | undefined): Date | undefined {
	if (!input) {
		return undefined;
	}
	const date = new Date(input);
	if (Number.isNaN(date.getTime())) {
		throw new Error("Invalid date format");
	}
	return date;
}

export function convertScheduleData(data: ScheduleDataRaw): ScheduleData {
	return {
		startDate: convertToDate(data.startDate),
		endDate: convertToDate(data.endDate),
		today: convertToDate(data.today),
		scheduleGroups: data.scheduleGroups.map((group) => ({
			groupName: group.groupName,
			schedules: group.schedules.map((schedule) => ({
				process: schedule.process,
				startDate: convertToDate(schedule.startDate) as Date,
				endDate: convertToDate(schedule.endDate) as Date,
				backgroundColor: schedule.backgroundColor ? new Color(schedule.backgroundColor) : undefined,
				textColor: schedule.textColor ? new Color(schedule.textColor) : undefined,
			})),
		})),
	};
}

export const rawData: ScheduleDataRaw = {
	//startDate: "2024-10-01", // 省略時はスケジュール群の開始日の最小値とする
	//endDate: "2025-05-04", // 省略時はスケジュール群の終了日の最大値とする
	today: "2024-11-10", // 省略時はシステム日付とする
	scheduleGroups: [
		{
			groupName: "メイン",
			schedules: [
				{ process: "RD", startDate: "2024-10-01", endDate: "2024-10-31" },
				{ process: "BD", startDate: "2024-11-10", endDate: "2024-12-21" },
				{ process: "設計審査", startDate: "2024-12-22", endDate: "2024-12-22" },
				{ process: "DD", startDate: "2024-12-25", endDate: "2025-01-30" },
			],
		},
		{
			groupName: "PF",
			schedules: [
				{
					process: "設計",
					startDate: "2024-11-05",
					endDate: "2024-11-30",
					backgroundColor: "#ffff00",
					textColor: "#ff0000",
				},
				{
					process: "構築",
					startDate: "2024-12-01",
					endDate: "2024-12-25",
					textColor: "#ff0000",
				},
				{ process: "単テ", startDate: "2025-01-10", endDate: "2025-01-20" },
			],
		},
		{
			groupName: "運用設計",
			schedules: [
				{ process: "設計", startDate: "2024-11-05", endDate: "2024-12-10" },
				{ process: "テスト", startDate: "2024-12-20", endDate: "2025-01-30" },
			],
		},
	],
};

/**
 * スケジュールデータから最小開始日と最大終了日を取得します。
 *
 * @param scheduleData - スケジュールデータのオブジェクト。
 * @returns 最小開始日と最大終了日を含むオブジェクト。開始日または終了日が存在しない場合は `undefined` を返します。
 */
export function getMinMaxDates(scheduleData: ScheduleData): {
	minStartDate: Date | undefined;
	maxEndDate: Date | undefined;
} {
	let minStartDate: Date | undefined = undefined;
	let maxEndDate: Date | undefined = undefined;

	for (const groupIndex in scheduleData.scheduleGroups) {
		const group = scheduleData.scheduleGroups[groupIndex];
		for (const scheduleIndex in group.schedules) {
			const schedule = group.schedules[scheduleIndex];
			if (!minStartDate || schedule.startDate < minStartDate) {
				minStartDate = schedule.startDate;
			}
			if (!maxEndDate || schedule.endDate > maxEndDate) {
				maxEndDate = schedule.endDate;
			}
		}
	}

	return { minStartDate, maxEndDate };
}

/**
 * 描画すべき最初の日と最後の日を求める
 *
 * @param scheduleData - スケジュールデータを含むオブジェクト。
 * @returns レンダリングの開始日と終了日を含むオブジェクト。
 * @throws 日付が不足している場合、レンダリング範囲を決定できないためエラーをスローします。
 */
export function getRenderRange(scheduleData: ScheduleData): {
	renderStartDate: Date;
	renderEndDate: Date;
} {
	const { minStartDate, maxEndDate } = getMinMaxDates(scheduleData);

	const renderStartDate = scheduleData.startDate || minStartDate;
	const renderEndDate = scheduleData.endDate || maxEndDate;

	if (!renderStartDate || !renderEndDate) {
		throw new Error("Unable to determine render range due to missing dates.");
	}

	return { renderStartDate, renderEndDate };
}

export const scheduleData1 = convertScheduleData(rawData);
// console.log(scheduleData1);

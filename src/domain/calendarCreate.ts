import {
	addDays,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	startOfMonth,
	startOfWeek,
} from "date-fns";

export const calendar = () => {
	const today = new Date();
	const tomorrow = addDays(today, 1);

	const monthStart = startOfMonth(today);
	const monthEnd = endOfMonth(monthStart);
	const calendarStart = startOfWeek(monthStart);
	const calendarEnd = endOfWeek(monthEnd);

	const days = eachDayOfInterval({
		start: calendarStart,
		end: calendarEnd,
	});

	return { days, today, tomorrow };
};

export const WEEK_DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

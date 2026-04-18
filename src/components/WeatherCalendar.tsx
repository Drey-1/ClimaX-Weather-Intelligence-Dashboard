import {
	addDays,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	isSameDay,
	startOfMonth,
	startOfWeek,
} from "date-fns";
import { Sun } from "lucide-react";

export default function WeatherCalendar() {
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

	const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return (
		<div className="w-full border border-card-foreground rounded-xl bg-card shadow-md overflow-hidden">
			<div className="grid grid-cols-7 border-b bg-primary">
				{weekDays.map((day) => (
					<div key={day} className="p-3 text-center text-sm text-icons border-r last:border-r-0">
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7">
				{days.map((day, i) => {
					const isCurrentMonth = day.getMonth() === today.getMonth();
					const isToday = isSameDay(day, today);
					const dayFormatted = format(day, "dd");

					return (
						<div
							key={i}
							className={`h-32 p-2 border-r border-b relative flex flex-col items-end group hover:scale-110 hover:z-10 transition-transform
                ${!isCurrentMonth ? "bg-foreground text-card-foreground" : "text-icons hover:bg-card"} ${isToday ? "bg-linear-to-b from-primary to-secondary" : ""}
              `}
						>
							<div className="flex gap-2 justify-between items-center text-sm w-full">
								{isToday && <span className="font-bold text-white text-xs uppercase">Today</span>}
								{isSameDay(day, tomorrow) && (
									<span className="font-bold text-xs uppercase text-accent">Tomorrow</span>
								)}
								<span className={`absolute top-2 right-2 ${isToday ? "font-bold text-white" : ""}`}>{dayFormatted}</span>
							</div>

							<div className="flex-1 w-full flex items-center justify-center">
								{day.getDate() === 16 && <Sun className="h-10 w-10 text-yellow-400" />}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

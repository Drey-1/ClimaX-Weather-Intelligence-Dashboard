import { format, isSameDay } from "date-fns";
import { useSelectedFavoriteCity } from "@/contexts/SelectedFavoriteCityContext";
import { calendar, WEEK_DAYS } from "@/domain/calendarCreate";
import { useWeatherCalendar } from "@/hooks/useWeatherCalendar";
import type { calendarCityForecastType } from "@/types/citiesWeathersType";

export default function WeatherCalendar() {
	const { selectedCity } = useSelectedFavoriteCity();
	const { data: calendarIcons, isPending, isError } = useWeatherCalendar(selectedCity);

	const { days, today, tomorrow } = calendar();

	if (isPending)
		return (
			<div className="grid grid-cols-7 gap-2">
				{Array.from({ length: 35 }).map((_, i) => {
					return <div className="h-32 bg-icons rounded-2xl animate-pulse" key={i}></div>;
				})}
			</div>
		);

	if (isError)
		return (
			<div className="bg-destructive  p-6 rounded-3xl w-max h-max">
				<p className="text-white text-sm">Error loading data.</p>
			</div>
		);

	return (
		<div className="w-full border border-card-foreground rounded-xl bg-card shadow-md overflow-hidden">
			<div className="grid grid-cols-7 border-b bg-primary">
				{WEEK_DAYS.map((day) => (
					<div key={day} className="p-3 text-center text-sm text-icons border-r last:border-r-0">
						<span className="inline sm:hidden">{day.slice(0, 3)}</span>
						<span className="hidden sm:inline">{day}</span>
					</div>
				))}
			</div>

			<div className="grid grid-cols-7">
				{days.map((day, i) => {
					const isCurrentMonth = day.getMonth() === today.getMonth();
					const isToday = isSameDay(day, today);
					const dayFormatted = format(day, "yyyy-MM-dd");
					const forecast = calendarIcons.find((item : calendarCityForecastType) => item.date === dayFormatted);

					return (
						<div
							key={i}
							className={`h-12 md:h-32 p-2 border-r border-b relative flex flex-col items-end group hover:scale-110 hover:z-10 transition-transform
                ${!isCurrentMonth ? "bg-foreground text-card-foreground" : "text-icons hover:bg-card"} ${isToday ? "bg-linear-to-b from-primary to-secondary" : ""}
              `}
						>
							<div className="flex gap-2 justify-between items-center text-sm w-full">
								{isToday && (
									<span className="font-bold text-white text-xs uppercase hidden sm:inline">
										Today
									</span>
								)}
								{isSameDay(day, tomorrow) && (
									<span className="font-bold text-xs uppercase text-accent hidden sm:inline">
										Tomorrow
									</span>
								)}
								<span
									className={`absolute top-1 right-1 sm:top-2 sm:right-2 ${isToday ? "font-bold text-white" : ""}`}
								>
									{format(day, "dd")}
								</span>
							</div>

							<div className="flex-1 w-full flex items-end sm:items-center justify-center">
								{forecast && <img src={forecast.icon} alt="" />}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

import { useQuery } from "@tanstack/react-query";
import { getForecast } from "@/services/wheatherService";
import type { calendarCityForecastType } from "@/types/citiesWeathersType";

export const useWeatherCalendar = (selectedCity: string | null) => {
	return useQuery({
		queryKey: ["caledarIcons", selectedCity],
		queryFn: async () => {
			const data = await getForecast(selectedCity as string, 14);
			return data.forecast.forecastday.map((item: calendarCityForecastType) => {
				return {
					icon: item.day.condition.icon,
					date: item.date,
				};
			});
		},
		enabled: !!selectedCity,
	});
};

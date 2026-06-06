import { useQuery } from "@tanstack/react-query";
import { getForecast } from "@/services/wheatherService";
import type { receivedNext7DaysWeatherType } from "@/types/next7DaysWeatherType";

export const useNext7DaysWeather = (selectedCity: string) => {
	return useQuery({
		queryKey: ["next7DaysWeather", selectedCity],
		queryFn: async () => {
			const data = await getForecast(selectedCity, 7);
			return data.forecast.forecastday.map((item: receivedNext7DaysWeatherType) => {
				const dateChar = item.date;
				const date = new Date(`${dateChar}T00:00:00`);
				return {
					text: item.day.condition.text,
					icon: item.day.condition.icon,
					dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
					minTempC: item.day.mintemp_c.toFixed(0) + "°C",
					maxTempC: item.day.maxtemp_c.toFixed(0) + "°C",
				};
			});
		},
		enabled: !!selectedCity,
	});
};

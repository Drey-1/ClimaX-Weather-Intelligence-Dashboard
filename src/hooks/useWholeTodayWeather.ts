import { useQuery } from "@tanstack/react-query";
import { getForecast } from "@/services/wheatherService";
import type { receivedWholeTodayWeatherType } from "@/types/wholeTodayWeatherType";

export const useWholeTodayWeather = (selectedCity: string) => {
	return useQuery({
		queryKey: ["wholeTodayWeather", selectedCity],
		queryFn: async () => {
			const data = await getForecast(selectedCity, 1);
			return data.forecast.forecastday[0].hour.map((item: receivedWholeTodayWeatherType) => {
				return {
					time: item.time.split(" ")[1],
					tempC: item.temp_c.toFixed(0),
					humidity: item.humidity,
					rainfall: item.precip_mm,
				};
			});
		},
		enabled: !!selectedCity,
	});
};

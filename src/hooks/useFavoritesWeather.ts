import { useQuery } from "@tanstack/react-query";
import { getForecast } from "@/services/wheatherService";

export const useFavoritesWeather = (favorites: string[]) => {
	return useQuery({
		queryKey: ["citiesWeathers", favorites],
		queryFn: async () => {
			return await Promise.all(
				favorites.map(async (city) => {
					const cityData = await getForecast(city, 1);
					return {
						icon: cityData.current.condition.icon,
						name: cityData.location.name,
						tempC: cityData.current.temp_c.toFixed(0),
						maxTempC: cityData.forecast.forecastday[0].day.maxtemp_c.toFixed(0),
						minTempC: cityData.forecast.forecastday[0].day.mintemp_c.toFixed(0),
					};
				}),
			);
		},
		enabled: favorites.length > 0,
	});
};

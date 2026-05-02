import { useEffect, useState } from "react";
import { getForecast } from "@/services/wheatherService";
import type { citiesWeathersType } from "@/types/citiesWeathersType";

export const useFavoritesWeather = (favorites: string[]) => {
	const [citiesWeathers, setCitiesWeathers] = useState<citiesWeathersType[]>([]);

	useEffect(() => {
		if (!favorites.length) return;
		const fetchCitiesData = async () => {
			try {
				const cityDatas: citiesWeathersType[] = await Promise.all(
					favorites.map(async (city) => {
						const cityData = await getForecast(city, 1);
						return {
							icon: cityData.current.condition.icon,
							name: cityData.location.name,
							tempC: cityData.current.temp_c,
							maxTempC: cityData.forecast.forecastday[0].day.maxtemp_c,
							minTempC: cityData.forecast.forecastday[0].day.mintemp_c,
						};
					}),
				);
				console.log(cityDatas);
				setCitiesWeathers(cityDatas);
			} catch (err) {
				console.error(err);
			}
		};
		fetchCitiesData();
	}, [favorites]);

	return { citiesWeathers };
};

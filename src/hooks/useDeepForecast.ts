import { useEffect, useState } from "react";
import { getForecast } from "@/services/wheatherService";
import type { deepCityForecastType } from "@/types/citiesWeathersType";

export const useDeepForecast = (selectedCity: string | null) => {
	const [deepForecasts, setDeepForescasts] = useState([]);

	useEffect(() => {
		if (!selectedCity) return;
		const fetchData = async () => {
			try {
				const data = await getForecast(selectedCity, 14);
				const usefulData = data.forecast.forecastday.map((item: deepCityForecastType) => {
					const dateChar = item.date;
					const date = new Date(`${dateChar}T00:00:00`);
                    
					return {
						day: dateChar.split("-")[2],
						icon: item.day.condition.icon,
						dayOfWeek: date.toLocaleDateString("en-US", { weekday: "short" }),
						minTempC: item.day.mintemp_c.toFixed(0) + "°C",
						maxTempC: item.day.maxtemp_c.toFixed(0) + "°C",
						precipitation: item.day.totalprecip_mm.toFixed(2),
					};
				});
				console.log(usefulData);
				setDeepForescasts(usefulData);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [selectedCity]);

	return { deepForecasts };
};

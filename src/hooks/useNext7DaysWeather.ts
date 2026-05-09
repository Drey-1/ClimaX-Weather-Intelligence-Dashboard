import { useEffect, useState } from "react";
import { getForecast } from "@/services/wheatherService";

export const useNext7DaysWeather = (selectedCity: string) => {
	const [next7DaysWeather, setNext7DaysWeather] = useState([]);

	useEffect(() => {
		if (!selectedCity) return;
		const fetchData = async () => {
			try {
				const data = await getForecast(selectedCity, 7);
				const usefulData = data.forecast.forecastday.map((item) => {
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
				console.log(usefulData);
				setNext7DaysWeather(usefulData);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [selectedCity]);

	return { next7DaysWeather };
};

import { useEffect, useState } from "react";
import { getForecast } from "@/services/wheatherService";
import type { calendarCityForecastType } from "@/types/citiesWeathersType";

export const useWeatherCalendar = (selectedCity: string | null) => {
	const [calendarIcons, setCalendarIcons] = useState([]);

	useEffect(() => {
		if (!selectedCity) return;
		const fetchData = async () => {
			try {
				const data = await getForecast(selectedCity, 14);
				const usefulData = data.forecast.forecastday.map((item: calendarCityForecastType) => {
					return {
						icon: item.day.condition.icon,
						date: item.date,
					};
				});
				console.log(usefulData);
				setCalendarIcons(usefulData);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [selectedCity]);

	return { calendarIcons };
};

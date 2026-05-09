import { useEffect, useState } from "react";
import { getForecast } from "@/services/wheatherService";

export const useWholeTodayWeather = (selectedCity: string) => {
	const [wholeTodayWeather, setWholeTodayWeather] = useState([]);

	useEffect(() => {
		if (!selectedCity) return;
		const fetchData = async () => {
			try {
				const data = await getForecast(selectedCity, 1);
				const usefulData = data.forecast.forecastday[0].hour.map((item) => {
					return {
						time: item.time.split(" ")[1],
						tempC: item.temp_c.toFixed(0),
						humidity: item.humidity,
						rainfall: item.precip_mm,
					};
				});
				console.log(usefulData);
				setWholeTodayWeather(usefulData);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [selectedCity]);

	return { wholeTodayWeather };
};

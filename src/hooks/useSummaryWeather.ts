import { useEffect, useState } from "react";
import { getCurrent } from "@/services/wheatherService";

export const useSummaryWeather = (selectedCity: string) => {
	const [summaryWeather, setSummaryWeather] = useState({});

	useEffect(() => {
		if (!selectedCity) return;
		const fetchData = async () => {
			try {
				const data = await getCurrent(selectedCity);
				const usefulData = {
					icon: data.current.condition.icon,
					tempC: data.current.temp_c.toFixed(0) + "°",
					text: data.current.condition.text,
					wind: data.current.wind_kph + "km/h",
					humidity: data.current.humidity + "%",
					visibility: data.current.vis_km + "km",
				};
				console.log(usefulData);
				setSummaryWeather(usefulData);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [selectedCity]);

	return { summaryWeather };
};

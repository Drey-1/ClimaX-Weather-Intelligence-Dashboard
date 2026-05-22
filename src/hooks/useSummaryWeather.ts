import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "@/services/wheatherService";


export const useSummaryWeather = (selectedCity: string) => {
	return useQuery({
		queryKey: ["summaryWeather", selectedCity],
		queryFn: async () => {
			const data = await getCurrent(selectedCity);
			
			return {
				icon: data.current.condition.icon,
				tempC: data.current.temp_c.toFixed(0) + "°",
				text: data.current.condition.text,
				wind: data.current.wind_kph + "km/h",
				humidity: data.current.humidity + "%",
				visibility: data.current.vis_km + "km",
			};
		},
		enabled: !!selectedCity,
	});
};

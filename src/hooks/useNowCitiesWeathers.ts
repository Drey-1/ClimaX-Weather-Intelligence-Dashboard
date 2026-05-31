import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "@/services/wheatherService";
const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
export const useNowCitiesWeathers = (favorites: string[]) => {
	return useQuery({
		queryKey: ["nowCitiesWeathers", favorites],
		queryFn: async () => {
			await sleep(3000)
			return await Promise.all(
				favorites.map(async (city) => {
					const nowCityData = await getCurrent(city);
					return {
						icon: nowCityData.current.condition.icon,
						name: nowCityData.location.name,
						tempC: nowCityData.current.temp_c.toFixed(0),
					};
				}),
			);
		},
		enabled: favorites.length > 0
	});
};

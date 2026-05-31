import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "@/services/wheatherService";
export const useNowCitiesWeathers = (favorites: string[]) => {
	return useQuery({
		queryKey: ["nowCitiesWeathers", favorites],
		queryFn: async () => {
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
		enabled: favorites.length > 0,
	});
};

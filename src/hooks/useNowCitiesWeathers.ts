import { useEffect, useState } from "react";
import { getCurrent } from "@/services/wheatherService";
import type { nowCitiesWeathersType } from "@/types/citiesWeathersType";

export const useNowCitiesWeathers = (favorites: string[]) => {
	const [nowCitiesWeathers, setNowCitiesWeathers] = useState<nowCitiesWeathersType[]>([]);

	useEffect(() => {
		if (!favorites.length) return;
		const fetchCitiesData = async () => {
			try {
				const nowCityDatas: nowCitiesWeathersType[] = await Promise.all(
					favorites.map(async (city) => {
						const nowCityData = await getCurrent(city);
						return {
							icon: nowCityData.current.condition.icon,
							name: nowCityData.location.name,
							tempC: nowCityData.current.temp_c.toFixed(0),
						};
					}),
				);
				console.log(nowCityDatas);
				setNowCitiesWeathers(nowCityDatas);
			} catch (err) {
				console.error(err);
			}
		};
		fetchCitiesData();
	}, [favorites]);

	return { nowCitiesWeathers };
};

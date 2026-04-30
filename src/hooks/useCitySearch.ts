import { useEffect, useState } from "react";
import { getAutocomplete } from "@/services/wheatherService";
import type { cityType, usedCityType } from "@/types/citiesTypes";

export const useCitySearch = () => {
	const [query, setQuery] = useState("New York");
	const [cityList, setCityList] = useState<usedCityType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAutocomplete(query);
				const organizedData = data.map((city: cityType) => {
					return {
						id: city.id,
						city: city.name,
					};
				});
				console.log(organizedData);
				setCityList(organizedData);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [query]);

	return { query, setQuery, cityList };
};

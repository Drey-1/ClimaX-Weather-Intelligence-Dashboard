import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAutocomplete } from "@/services/wheatherService";
import type { cityType, usedCityType } from "@/types/citiesTypes";

export const useCitySearch = () => {
	const [query, setQuery] = useState("New York");

	const {
		data: cityList = [],
		isPending,
		isError,
	} = useQuery<usedCityType[]>({
		queryKey: ["citySearch", query],
		queryFn: async () => {
			const data = await getAutocomplete(query);
			return data.map((city: cityType) => ({
				id: city.id,
				city: city.name,
			}));
		},
		enabled: !!query,
	});

	return { query, setQuery, cityList, isPending, isError };
};

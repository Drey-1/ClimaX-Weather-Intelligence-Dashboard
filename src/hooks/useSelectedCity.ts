import { useState } from "react";
import { loadPrincipalCity, savePrincipalCity } from "@/services/localStorage";

const getPrincipalCity = (): string => {
	const storedCity = loadPrincipalCity();
	if (!storedCity) {
		savePrincipalCity("New York");
		return "New York";
	}
	return storedCity;
};

export const useSelectedCitys = () => {
	const [selectedCity, setSelectedCity] = useState<string>(getPrincipalCity());

	const changeSelectedCity = (city: string) => {
		setSelectedCity(city);
		savePrincipalCity(city);
	};

	return {
		selectedCity,
		changeSelectedCity,
	};
};

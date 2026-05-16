import { createContext, type ReactNode, useContext, useState } from "react";
import { loadPrincipalCity, savePrincipalCity } from "@/services/localStorage";
import type { SelectedCityContextType } from "@/types/SelectedCityContextType";

const getPrincipalCity = (): string => {
	const storedCity = loadPrincipalCity();
	if (!storedCity) {
		savePrincipalCity("New York");
		return "New York";
	}
	return storedCity;
};

const SelectedCityContext = createContext<SelectedCityContextType | null>(null);

export const SelectedCityProvider = ({ children }: { children: ReactNode }) => {
	const [selectedCity, setSelectedCity] = useState<string>(getPrincipalCity());

	const changeSelectedCity = (city: string) => {
		setSelectedCity(city);
		savePrincipalCity(city);
	};

	return (
		<SelectedCityContext.Provider value={{ selectedCity, changeSelectedCity }}>
			{children}
		</SelectedCityContext.Provider>
	);
};

export const useSelectedCity = () => {
	const context = useContext(SelectedCityContext);
	if (!context) {
		throw new Error("useSelectedCitys must be used within SelectedCityProvider");
	}
	return context;
};

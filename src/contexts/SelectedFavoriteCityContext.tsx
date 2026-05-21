import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useNowCitiesWeathers } from "@/hooks/useNowCitiesWeathers";
import type { SelectedFavoriteContextType } from "@/types/SelectedFavoriteContextType";
import { useFavorites } from "./FavoritesContext";

const SelectedFavoriteContext = createContext<SelectedFavoriteContextType | null>(null);

export const SelectedFavoriteProvider = ({ children }: { children: ReactNode }) => {
	const { favorites } = useFavorites();
	const { nowCitiesWeathers } = useNowCitiesWeathers(favorites);
	const [selectedCity, setSelectedCity] = useState<string | null>(null);

	useEffect(() => {
		if (nowCitiesWeathers.length > 0 && selectedCity === null) {
			setSelectedCity(nowCitiesWeathers[0].name);
		}
	}, [nowCitiesWeathers, selectedCity]);

	return (
		<SelectedFavoriteContext.Provider value={{ selectedCity, setSelectedCity }}>
			{children}
		</SelectedFavoriteContext.Provider>
	);
};

export const useSelectedFavoriteCity = () => {
	const context = useContext(SelectedFavoriteContext);
	if (!context) {
		throw new Error("useSelectedFavoriteCity must be used within SelectedFavoriteProvider");
	}
	return context;
};

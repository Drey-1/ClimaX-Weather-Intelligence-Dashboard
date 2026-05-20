import { createContext, type ReactNode, useContext, useState } from "react";
import { loadFavorites, saveFavorites } from "@/services/localStorage";
import type { FavoritesContextType } from "@/types/FavoritesContextType";

const loadFavoritedCities = (): string[] => {
	const storedFavorited = loadFavorites();
	if (!storedFavorited) {
		saveFavorites([]);
		return [];
	}
	return JSON.parse(storedFavorited);
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesCitiesProvider = ({ children }: { children: ReactNode }) => {
	const [favorites, setFavorites] = useState<string[]>(loadFavoritedCities);

	const toggleFavorite = (city: string) => {
		setFavorites((prev) => {
			const updated = prev.includes(city) ? prev.filter((item) => item !== city) : [...prev, city];
			saveFavorites(updated);
			return updated;
		});
	};

	const isFavorited = (city: string) => {
		return favorites.includes(city);
	};
	return (
		<FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited}}>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within FavoritesCitiesProvider");
	}
	return context;
};

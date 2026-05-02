import { useState } from "react";
import { loadFavorites, saveFavorites } from "@/services/localStorage";

const loadFavoritedCities = (): string[] => {
	const storedFavorited = loadFavorites();
	if (!storedFavorited) {
		saveFavorites([]);
		return [];
	}
	return JSON.parse(storedFavorited);
};

export const useFavorites = () => {
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

	return {
		favorites,
		toggleFavorite,
		isFavorited,
	};
};

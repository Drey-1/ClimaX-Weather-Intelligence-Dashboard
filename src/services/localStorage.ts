const loadFavorites = (): string | null => {
	return localStorage.getItem("favoritedCities");
};

const saveFavorites = (citiesList: string[]) => {
	localStorage.setItem("favoritedCities", JSON.stringify(citiesList));
};

export { loadFavorites, saveFavorites };

const loadFavorites = (): string | null => {
	return localStorage.getItem("favoritedCities");
};

const saveFavorites = (citiesList: string[]) => {
	localStorage.setItem("favoritedCities", JSON.stringify(citiesList));
};

const loadPrincipalCity = (): string | null => {
	return localStorage.getItem("principalCity");
};

const savePrincipalCity = (city: string) => {
	localStorage.setItem("principalCity", city);
};

export { loadFavorites, saveFavorites, loadPrincipalCity, savePrincipalCity };

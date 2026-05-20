export type FavoritesContextType = {
	favorites: string[];
	toggleFavorite: (city: string) => void;
	isFavorited: (city: string) => boolean;
};

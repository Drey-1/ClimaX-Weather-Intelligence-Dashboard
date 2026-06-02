import { StarIcon } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNotification } from "@/contexts/NotificationContext";
import type { citiesWeathersType } from "@/types/citiesWeathersType";

export default function FavoriteCards({
	icon,
	name,
	tempC,
	minTempC,
	maxTempC,
}: citiesWeathersType) {
	const { toggleFavorite } = useFavorites();
	const { notification } = useNotification();

	return (
		<div className="grid grid-cols-5 items-center border-2 border-card rounded-3xl p-4 justify-between ">
			<button
				type="button"
				onClick={() => {
					toggleFavorite(name);
					notification(`${name} removed from your favorties list`);
				}}
			>
				<StarIcon size={38} fill="currentColor" className="text-icons cursor-pointer" />
			</button>
			<img src={icon} alt="" />
			<p className="text-icons text-3xl">{name}</p>
			<p className="text-icons text-3xl">{tempC}°C</p>
			<div className="grid grid-cols-2 border-l border-card-foreground text-icons pl-12 pr-4 gap-10">
				<div className="flex flex-col text-accent text-center">
					<h3>Min</h3>
					<p>{minTempC}°C</p>
				</div>
				<div className="flex flex-col text-destructive text-center">
					<h3>Max</h3>
					<p>{maxTempC}°C</p>
				</div>
			</div>
		</div>
	);
}

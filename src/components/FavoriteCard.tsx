import { StarIcon } from "lucide-react";
import type { favoriteCardsProps } from "@/types/favoriteCardsProps";

export default function FavoriteCards({
	icon: Icon,
	city,
	maxTemp,
	minTemp,
	tempNow,
}: favoriteCardsProps) {
	return (
		<div className="flex border-2 border-card rounded-3xl p-4 justify-between items-center">
			<button type="button">
				<StarIcon size={38} className="text-icons" />
			</button>
			<Icon className="text-icons" size={38} />
			<p className="text-icons text-3xl">{city}</p>
			<p className="text-icons text-3xl">{tempNow}</p>
			<div className="flex border-l border-card-foreground text-icons pl-12 pr-4 gap-10">
				<div className="flex flex-col text-accent">
					<h3>Min</h3>
					<p>{minTemp}</p>
				</div>
				<div className="flex flex-col text-destructive">
					<h3>Max</h3>
					<p>{maxTemp}</p>
				</div>
			</div>
		</div>
	);
}

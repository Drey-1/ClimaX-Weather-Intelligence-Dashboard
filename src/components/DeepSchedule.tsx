import { DropletIcon } from "lucide-react";
import { useDeepForecast } from "@/hooks/useDeepForecast";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useSelectedFavoriteCity } from "@/hooks/useSelectedFavoriteCity";

export default function DeepSchedule() {
	const { favorites } = useFavorites();
	const { selectedCity } = useSelectedFavoriteCity(favorites);
	const { deepForecasts } = useDeepForecast(selectedCity);

	return (
		<div className="px-4 text-icons text-xl ">
			{deepForecasts.map((day) => {
				return (
					<div
						key={day.day}
						className="grid grid-cols-4 items-center border-t border-card-foreground"
					>
						<div className="text-center p-1">
							<p>{day.day}</p>
							<p>{day.dayOfWeek}</p>
						</div>
						<img src={day.icon} alt="" />
						<div className="flex gap-4">
							<div className="text-accent">{day.minTempC}</div>
							<div className="text-destructive">{day.maxTempC}</div>
						</div>
						<div className="flex">
							<DropletIcon />
							{day.precipitation}
						</div>
					</div>
				);
			})}
		</div>
	);
}

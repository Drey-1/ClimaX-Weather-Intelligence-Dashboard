import { DropletIcon } from "lucide-react";
import { useSelectedFavoriteCity } from "@/contexts/SelectedFavoriteCityContext";
import { useDeepForecast } from "@/hooks/useDeepForecast";
import type { deepForecastsInUseType } from "@/types/deepForecastsInUseType";

export default function DeepSchedule() {
	const { selectedCity } = useSelectedFavoriteCity();
	const { data: deepForecasts, isPending, isError } = useDeepForecast(selectedCity);

	if (isPending)
		return (
			<div className="flex flex-col gap-2">
				{Array.from({ length: 7 }).map((_, i) => (
					<div className="grid grid-cols-4 gap-4 px-2" key={i}>
						<div className="h-13 bg-icons animate-pulse rounded-2xl"></div>
						<div className="h-13 bg-icons animate-pulse rounded-2xl col-span-2"></div>
						<div className="h-13 bg-icons animate-pulse rounded-2xl"></div>
					</div>
				))}
			</div>
		);
	if (isError)
		return (
			<div className="bg-destructive  p-6 rounded-3xl w-max h-max">
				<p className="text-white text-sm">Error loading data.</p>
			</div>
		);

	return (
		<div className="px-4 text-icons text-lg sm:text-xl ">
			{deepForecasts.map((day: deepForecastsInUseType) => {
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
						<div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
							<div className="text-accent">{day.minTempC}</div>
							<div className="text-destructive">{day.maxTempC}</div>
						</div>
						<div className="flex items-center gap-1">
							<DropletIcon className="size-4 sm:size-6 shrink-0" />
							<p>{day.precipitation}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";
import DeepSchedule from "@/components/DeepSchedule";
import FavoriteCarousel from "@/components/FavoriteCarousel";
import WeatherCalendar from "@/components/WeatherCalendar";
import { SelectedFavoriteProvider } from "@/contexts/SelectedFavoriteCityContext";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const [dataPresentation, setDataPresentation] = useState<"simple" | "deep">("simple");

	const dateData = dayjs();
	const monthYear = dateData.format("MMMM YYYY").split(" ");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDataPresentation(e.target.value as "simple" | "deep");
	};

	return (
		<SelectedFavoriteProvider>
			<div className="flex flex-col gap-2">
				<FavoriteCarousel />
				<div className="flex flex-col gap-6 bg-card p-4 rounded-3xl">
					<div className="flex justify-between  items-center text-icons">
						<h3 className="text-xl font-semibold">{`${monthYear[0]} ${monthYear[1]}`}</h3>
						<div className="flex gap-4 border border-card-foreground rounded-3xl p-0.5">
							<div>
								<input
									type="radio"
									name="type"
									id="simple"
									value="simple"
									className="sr-only peer"
									onChange={handleChange}
									checked={dataPresentation === "simple"}
								/>
								<label
									htmlFor="simple"
									className="peer-checked:bg-card-foreground block rounded-3xl px-3 sm:px-6 py-0.5 cursor-pointer"
								>
									Simple
								</label>
							</div>

							<div>
								<input
									type="radio"
									name="type"
									id="deep"
									value="deep"
									className="sr-only peer"
									onChange={handleChange}
									checked={dataPresentation === "deep"}
								/>
								<label
									htmlFor="deep"
									className="peer-checked:bg-card-foreground block rounded-3xl px-3 sm:px-6 py-0.5 cursor-pointer"
								>
									Deep
								</label>
							</div>
						</div>
					</div>

					{dataPresentation === "simple" ? <WeatherCalendar /> : <DeepSchedule />}
				</div>
			</div>
		</SelectedFavoriteProvider>
	);
}

import { Cloud } from "lucide-react";

export default function ForecastCard() {
	const mockCitys = [
		{
			weekday: 0,
			icon: null,
			weather: "windy",
			minTemp: "16°",
			maxTemp: "28°",
		},
		{
			weekday: 1,
			icon: null,
			weather: "windy",
			minTemp: "16°",
			maxTemp: "28°",
		},
		{
			weekday: 2,
			icon: null,
			weather: "windy",
			minTemp: "16°",
			maxTemp: "28°",
		},
		{
			weekday: 3,
			icon: null,
			weather: "windy",
			minTemp: "16°",
			maxTemp: "28°",
		},
		{
			weekday: 4,
			icon: null,
			weather: "windy",
			minTemp: "16°",
			maxTemp: "28°",
		},
		{
			weekday: 5,
			icon: null,
			weather: "Cloudy",
			minTemp: "16°",
			maxTemp: "28°",
		},
		{
			weekday: 6,
			icon: null,
			weather: "windy",
			minTemp: "16°",
			maxTemp: "28°",
		},
	];
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return (
		<div className="relative bg-card rounded-3xl p-4 w-full h-82 flex flex-col">
			<h2 className="text-icons font-semibold text-xl">Next 7 days</h2>
			<div className="flex-1 overflow-y-scroll scrollbar-hide">
				{mockCitys.map((city) => {
					return (
						<div key={city.weekday} className="grid grid-cols-3 items-center text-icons p-4">
							<p>{weekdays[city.weekday]}</p>
							<div className="flex gap-2 justify-center">
								{city.icon ?? <Cloud />}
								<p>{city.weather}</p>
							</div>
							<p className="text-right tabular-nums">
								{city.minTemp}/{city.maxTemp}
							</p>
						</div>
					);
				})}
				<div className="sticky bottom-0">
					<div className="absolute -top-12 pointer-events-none bg-linear-to-b from-transparent to-card w-full h-12"></div>
					<div className="grid grid-cols-3 items-center p-4 bg-linear-to-b from-primary to-secondary rounded-2xl text-white">
						<p className="">Tommorow</p>
						<div className="flex gap-2 justify-center">
							<Cloud />
							<p>Cloudy</p>
						</div>
						<p className="text-right tabular-nums">16°/23°</p>
					</div>
				</div>
			</div>
		</div>
	);
}

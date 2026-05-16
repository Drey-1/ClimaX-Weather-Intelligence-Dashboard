import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useNext7DaysWeather } from "@/hooks/useNext7DaysWeather";

export default function ForecastCard() {
	const { selectedCity } = useSelectedCity();
	const { next7DaysWeather } = useNext7DaysWeather(selectedCity);
	console.log(next7DaysWeather[1]);
	return (
		<div className="relative bg-card rounded-3xl p-4 w-full h-82 flex flex-col">
			<h2 className="text-icons font-semibold text-xl">Next 7 days</h2>
			<div className="flex-1 overflow-y-scroll scrollbar-hide">
				{next7DaysWeather.map((city) => {
					return (
						<div key={city.dayOfWeek} className="grid grid-cols-3 items-center text-icons p-4">
							<p>{city.dayOfWeek}</p>
							<div className="flex gap-2 justify-center items-center">
								<img src={city.icon} alt="" />
								<p>{city.text}</p>
							</div>
							<p className="text-right tabular-nums">
								{city.minTempC}/{city.maxTempC}
							</p>
						</div>
					);
				})}
				<div className="sticky bottom-0">
					<div className="absolute -top-12 pointer-events-none bg-linear-to-b from-transparent to-card w-full h-12"></div>
					<div className="grid grid-cols-3 items-center p-4 bg-linear-to-b from-primary to-secondary rounded-2xl text-white">
						<p className="">Tommorow</p>
						<div className="flex gap-2 justify-center items-center">
							<img src={next7DaysWeather[1]?.icon} alt="" />
							<p>{next7DaysWeather[1]?.text}</p>
						</div>
						<p className="text-right tabular-nums">
							{next7DaysWeather[1]?.minTempC}/{next7DaysWeather[1]?.maxTempC}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useWeatherChart } from "@/hooks/useWeatherChart";
import { useWholeTodayWeather } from "@/hooks/useWholeTodayWeather";
import { Chart } from "./Chart";

export default function WeatherChart() {
	const { selectedCity } = useSelectedCity();
	const { data: wholeTodayWeather, isPending, isError } = useWholeTodayWeather(selectedCity);
	const { chartType, handleChange, chartData } = useWeatherChart(wholeTodayWeather);

	if (isPending)
		return (
			<div className="bg-card rounded-3xl p-4">
				<div className="flex justify-between text-icons">
					<h2 className="text-xl  font-semibold">Overview</h2>
					<div className="flex gap-4 border border-card-foreground rounded-3xl p-0.5">
						<div className="rounded-3xl px-6 py-0.5">Temperature</div>
						<div className="rounded-3xl px-6 py-0.5">Humidity</div>
						<div className="rounded-3xl px-6 py-0.5">Rainfall</div>
					</div>
				</div>
				<div className="h-128 bg-linear-to-t to-transparent via-accent from-transparent animate-pulse rounded-2xl"></div>
			</div>
		);

	if (isError)
		return (
			<div className="bg-destructive  p-6 rounded-3xl w-max h-max">
				<p className="text-white text-sm">Error loading data.</p>
			</div>
		);

	return (
		<div className="bg-card rounded-3xl p-4">
			<div className="flex flex-col md:flex-row justify-between items-center text-icons mb-2 sm:mb-0">
				<h2 className="text-xl font-semibold">Overview</h2>
				<div className="flex gap-1 sm:gap-4 border border-card-foreground rounded-3xl p-0.5">
					<div>
						<input
							type="radio"
							name="type"
							id="temp"
							value={"temp"}
							className="sr-only peer"
							onChange={handleChange}
							checked={chartType === "temp"}
						/>
						<label
							htmlFor="temp"
							className="peer-checked:bg-card-foreground rounded-3xl px-2 sm:px-6 py-0.5 cursor-pointer"
						>
							Temperature
						</label>
					</div>
					<div>
						<input
							type="radio"
							name="type"
							id="humidity"
							value={"hum"}
							className="sr-only peer"
							onChange={handleChange}
						/>
						<label
							htmlFor="humidity"
							className="peer-checked:bg-card-foreground rounded-3xl px-2 sm:px-6 py-0.5 cursor-pointer"
						>
							Humidity
						</label>
					</div>
					<div>
						<input
							type="radio"
							name="type"
							id="rain"
							value={"rain"}
							className="sr-only peer"
							onChange={handleChange}
						/>
						<label
							htmlFor="rain"
							className="peer-checked:bg-card-foreground rounded-3xl px-2 sm:px-6 py-0.5 cursor-pointer"
						>
							Rainfall
						</label>
					</div>
				</div>
			</div>
			<Chart type={chartType} chartData={chartData} />
		</div>
	);
}

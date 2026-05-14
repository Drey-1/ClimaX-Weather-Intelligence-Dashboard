import { useSelectedCitys } from "@/hooks/useSelectedCity";
import { useWeatherChart } from "@/hooks/useWeatherChart";
import { useWholeTodayWeather } from "@/hooks/useWholeTodayWeather";
import { Chart } from "./Chart";

export default function WeatherChart() {
	const { selectedCity } = useSelectedCitys();
	const { wholeTodayWeather } = useWholeTodayWeather(selectedCity);
	const { chartType, handleChange, chartData } = useWeatherChart(wholeTodayWeather);

	return (
		<div className="bg-card rounded-3xl p-4">
			<div className="flex justify-between items-center text-icons">
				<h2 className="text-xl font-semibold">Overview</h2>
				<div className="flex gap-4 border border-card-foreground rounded-3xl p-0.5">
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
							className="peer-checked:bg-card-foreground rounded-3xl px-6 py-0.5 cursor-pointer"
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
							className="peer-checked:bg-card-foreground rounded-3xl px-6 py-0.5 cursor-pointer"
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
							className="peer-checked:bg-card-foreground rounded-3xl px-6 py-0.5 cursor-pointer"
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

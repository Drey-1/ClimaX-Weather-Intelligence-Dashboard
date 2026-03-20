import type React from "react";
import { useState } from "react";
import { Chart } from "./Chart";

export default function WeatherChart() {
	const [chartType, setChartType] = useState<"temp" | "rain" | "hum">("temp");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChartType(e.target.value as "temp" | "rain" | "hum");
	};
	return (
		<div className="bg-card rounded-3xl p-4">
			<div className="flex justify-between items-center text-icons">
				<h2 className="text-xl font-semibold">Overview</h2>
				<div className="flex gap-4 border border-card-foreground rounded-3xl p-0.5">
					<input
						type="radio"
						name="type"
						id="temp"
						value={"temp"}
						className="sr-only"
						onChange={handleChange}
					/>
					<label htmlFor="temp" className="bg-card-foreground rounded-3xl px-6 cursor-pointer c">
						Temperature
					</label>
					<input
						type="radio"
						name="type"
						id="humidity"
						value={"hum"}
						className="sr-only"
						onChange={handleChange}
					/>
					<label htmlFor="humidity" className=" rounded-3xl px-6 cursor-pointer">
						Humidity
					</label>
					<input
						type="radio"
						name="type"
						id="rain"
						value={"rain"}
						className="sr-only"
						onChange={handleChange}
					/>
					<label htmlFor="rain" className=" rounded-3xl px-6 cursor-pointer">
						Rainfall
					</label>
				</div>
			</div>
			<Chart type={chartType} />
		</div>
	);
}
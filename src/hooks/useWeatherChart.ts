import { useState } from "react";
import { mapWeatherToChartData } from "@/domain/weatherChart.domain";
import type { ChartType } from "@/types/chartTypes";
import type { WholeTodayWeatherType } from "@/types/wholeTodayWeatherType";

export const useWeatherChart = (weatherData: WholeTodayWeatherType[]) => {
	const [chartType, setChartType] = useState<ChartType>("temp");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChartType(e.target.value as ChartType);
	};

	const chartData = mapWeatherToChartData(weatherData, chartType);

	return { chartType, handleChange, chartData };
};

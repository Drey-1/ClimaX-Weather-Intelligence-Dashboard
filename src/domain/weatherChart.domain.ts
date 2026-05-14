import type { ChartType } from "@/types/chartTypes";
import type { WholeTodayWeatherType } from "@/types/wholeTodayWeatherType";

export const TICK_MAP = {
	temp: [0, 5, 10, 15, 20, 25, 30, 35, 40],
	hum: [0, 20, 40, 60, 80, 100],
	rain: [0, 5, 10],
};

export const UNIT_MAP = {
	temp: "C°",
	hum: "%",
	rain: "mm",
};

export const mapWeatherToChartData = (
	wholeTodayWeather: WholeTodayWeatherType[],
	chartType: ChartType,
) => {
	return wholeTodayWeather.map((item) => {
		return {
			hour: item.time,
			value:
				chartType === "temp" ? item.tempC : chartType === "hum" ? item.humidity : item.rainfall,
		};
	});
};

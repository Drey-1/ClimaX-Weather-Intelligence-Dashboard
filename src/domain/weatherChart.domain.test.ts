import { describe, expect, it } from "vitest";
import type { WholeTodayWeatherType } from "@/types/wholeTodayWeatherType";
import { mapWeatherToChartData } from "./weatherChart.domain";

const mockWholeTodayWeather: WholeTodayWeatherType[] = [
	{ time: "01:00", humidity: 70, rainfall: 0, tempC: 23 },
	{ time: "02:00", humidity: 72, rainfall: 0, tempC: 21 },
	{ time: "03:00", humidity: 68, rainfall: 1, tempC: 20 },
];

describe("mapWeatherToChartData", () => {
	it("return an empty array when data is undefined", () => {
		const mockWholeTodayWeather = undefined;

		const chartData = mapWeatherToChartData(mockWholeTodayWeather, "hum");

		expect(chartData).toEqual([]);
	});

	it("return an empty array when data is empty", () => {
		const mockWholeTodayWeather: WholeTodayWeatherType[] = [];

		const chartData = mapWeatherToChartData(mockWholeTodayWeather, "hum");

		expect(chartData).toEqual([]);
	});

	it("maps tempC to value when chartType is 'temp'", () => {
		const chartData = mapWeatherToChartData(mockWholeTodayWeather, "temp");

		expect(chartData[0].value).toBe(23);
		expect(chartData[1].value).toBe(21);
		expect(chartData[2].value).toBe(20);
	});

	it("maps humidity to value when chartType is 'hum'", () => {
		const chartData = mapWeatherToChartData(mockWholeTodayWeather, "hum");

		expect(chartData[0].value).toBe(70);
		expect(chartData[1].value).toBe(72);
		expect(chartData[2].value).toBe(68);
	});

	it("maps rainfall to value when chartType is 'rain'", () => {
		const chartData = mapWeatherToChartData(mockWholeTodayWeather, "rain");

		expect(chartData[0].value).toBe(0);
		expect(chartData[1].value).toBe(0);
		expect(chartData[2].value).toBe(1);
	});

	it("maps time to hour for every item", () => {
		const chartData = mapWeatherToChartData(mockWholeTodayWeather, "temp");

		expect(chartData[0].hour).toBe("01:00");
		expect(chartData[1].hour).toBe("02:00");
		expect(chartData[2].hour).toBe("03:00");
	});

	it("preserves the order and length of the input array", () => {
		const chartData = mapWeatherToChartData(mockWholeTodayWeather, "temp");

		expect(chartData).toHaveLength(mockWholeTodayWeather.length);
	});
});

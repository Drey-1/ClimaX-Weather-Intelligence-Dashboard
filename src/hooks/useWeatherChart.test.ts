import { act, renderHook } from "@testing-library/react";
import type React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as weatherDomain from "@/domain/weatherChart.domain";
import type { WholeTodayWeatherType } from "@/types/wholeTodayWeatherType";
import { useWeatherChart } from "./useWeatherChart";

const mockWeatherData: WholeTodayWeatherType[] = [
	{
		time: "00:00",
		tempC: 13,
		humidity: 62,
		rainfall: 1.22,
	},
	{
		time: "01:00",
		tempC: 12,
		humidity: 73,
		rainfall: 0.14,
	},
];

describe("useWeatherChart", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});
	it("must initializes chartType as 'temp'", () => {
		const { result } = renderHook(() => useWeatherChart(mockWeatherData));

		expect(result.current.chartType).toBe("temp");
	});

	it("must updates chartType when handleChange is called", () => {
		const { result } = renderHook(() => useWeatherChart(mockWeatherData));

		act(() => {
			result.current.handleChange({
				target: { value: "hum" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.chartType).toBe("hum");
	});

	it("must calls mapWeatherToChartData with the current weatherData and chartType", () => {
		const mapSpy = vi.spyOn(weatherDomain, "mapWeatherToChartData");
		const { result } = renderHook(() => useWeatherChart(mockWeatherData));

		expect(mapSpy).toHaveBeenCalledWith(mockWeatherData, result.current.chartType);
	});

	it("must returns chartData reflecting the selected chartType after a change", () => {
		const { result } = renderHook(() => useWeatherChart(mockWeatherData));

		expect(result.current.chartType).toEqual("temp");

		act(() => {
			result.current.handleChange({
				target: { value: "hum" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.chartType).toEqual("hum");

		expect(result.current.chartData).toEqual([
			{
				hour: "00:00",
				value: 62,
			},
			{
				hour: "01:00",
				value: 73,
			},
		]);
	});
});

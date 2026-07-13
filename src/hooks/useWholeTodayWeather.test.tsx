import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getForecast } from "@/services/wheatherService";
import { useWholeTodayWeather } from "./useWholeTodayWeather";

vi.mock("../services/wheatherService.ts");

const mockGetForecastData = {
	forecast: {
		forecastday: [
			{
				hour: [
					{
						time: "2026-01-01 00:00",
						temp_c: 13.22,
						humidity: 62,
						precip_mm: 1.22,
					},
					{
						time: "2026-01-01 01:00",
						temp_c: 12.16,
						humidity: 73,
						precip_mm: 0.14,
					},
				],
			},
		],
	},
};

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe("useWholeTodayWeather", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must not call getForecast when selectedCity is empty", () => {
		renderHook(() => useWholeTodayWeather(""), { wrapper: createWrapper() });

		expect(getForecast).not.toHaveBeenCalled();
	});

	it("calls getForecast with the selected city and 1 as days", () => {
		renderHook(() => useWholeTodayWeather("London"), { wrapper: createWrapper() });

		expect(getForecast).toHaveBeenCalledWith("London", 1);
	});

	it("returns mapped data with time, tempC, humidity and rainfall for each hour", async () => {
		vi.mocked(getForecast).mockResolvedValue(mockGetForecastData);
		const { result } = renderHook(() => useWholeTodayWeather("London"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual([
			{
				humidity: 62,
				rainfall: 1.22,
				tempC: "13",
				time: "00:00",
			},
			{
				humidity: 73,
				rainfall: 0.14,
				tempC: "12",
				time: "01:00",
			},
		]);
	});

	it("sets isError to true when getForecast rejects", async () => {
		vi.mocked(getForecast).mockRejectedValue(new Error("Error!"));
		const { result } = renderHook(() => useWholeTodayWeather("London"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getForecast } from "@/services/wheatherService";
import { useWeatherCalendar } from "./useWeatherCalendar";

vi.mock("../services/wheatherService.ts");

const mockGetForecastData = {
	forecast: {
		forecastday: [
			{
				date: "2026-01-01",
				day: {
					condition: {
						icon: "https://website.com",
					},
				},
			},
			{
				date: "2026-01-02",
				day: {
					condition: {
						icon: "https://website.com",
					},
				},
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

describe("useWeatherCalendar", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must not calls getForecast when selectedCity is empty", () => {
		renderHook(() => useWeatherCalendar(""), { wrapper: createWrapper() });

		expect(getForecast).not.toHaveBeenCalled();
	});

	it("must calls getForecast with the selected city and 14 as days", () => {
		renderHook(() => useWeatherCalendar("London"), { wrapper: createWrapper() });

		expect(getForecast).toHaveBeenCalledWith("London", 14);
	});

	it("must returns mapped data with icon and date for each forecast day", async () => {
		vi.mocked(getForecast).mockResolvedValue(mockGetForecastData);
		const { result } = renderHook(() => useWeatherCalendar("London"), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual([
			{
				date: "2026-01-01",
				icon: "https://website.com",
			},
			{
				date: "2026-01-02",
				icon: "https://website.com",
			},
		]);
	});

    it("must returns mapped data with icon and date for each forecast day", async () => {
		vi.mocked(getForecast).mockRejectedValue(new Error("Error!"));
		const { result } = renderHook(() => useWeatherCalendar("London"), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});

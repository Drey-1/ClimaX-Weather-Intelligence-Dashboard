import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getForecast } from "@/services/wheatherService";
import { useNext7DaysWeather } from "./useNext7DaysWeather";

vi.mock("../services/wheatherService.ts");

const mockGetForecastData = {
	forecast: {
		forecastday: [
			{
				date: "2026-01-01",
				day: {
					condition: {
						icon: "https://website.com",
						text: "Sunny",
					},
					maxtemp_c: 25.23,
					mintemp_c: 12.41,
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

describe("useNext7DaysWeather", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});
	it("must not call getForecast when selectedCity is empty", () => {
		renderHook(() => useNext7DaysWeather(""), { wrapper: createWrapper() });

		expect(getForecast).not.toHaveBeenCalled();
	});

	it("must calls getForecast with the selected city and 7 as days", () => {
		renderHook(() => useNext7DaysWeather("London"), { wrapper: createWrapper() });

		expect(getForecast).toHaveBeenCalledWith("London", 7);
	});

	it("must returns mapped data with text, icon, dayOfWeek, minTempC and maxTempC with correct formations", async () => {
		vi.mocked(getForecast).mockResolvedValue(mockGetForecastData);
		const { result } = renderHook(() => useNext7DaysWeather("London"), {
			wrapper: createWrapper(),
		});
		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual([
			{
				dayOfWeek: "Thursday",
				icon: "https://website.com",
				maxTempC: "25°C",
				minTempC: "12°C",
				text: "Sunny",
			},
		]);
	});

	it("set isError to true when getForecast rejects", async () => {
		vi.mocked(getForecast).mockRejectedValue("Error!");
		const { result } = renderHook(() => useNext7DaysWeather("1234567"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getForecast } from "@/services/wheatherService";
import { useDeepForecast } from "./useDeepForecast";

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
					mintemp_c: 16.2,
					maxtemp_c: 28.4,
					totalprecip_mm: 0.22,
				},
			},
			{
				date: "2026-01-02",
				day: {
					condition: {
						icon: "https://website.com",
					},
					mintemp_c: 12.2,
					maxtemp_c: 24.8,
					totalprecip_mm: 0,
				},
			},
			{
				date: "2026-01-03",
				day: {
					condition: {
						icon: "https://website.com",
					},
					mintemp_c: 14.2,
					maxtemp_c: 27.2,
					totalprecip_mm: 0.1,
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

describe("useDeepForecast", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("must not call getForecast when selectedCity is null", () => {
		const { result } = renderHook(() => useDeepForecast(null), { wrapper: createWrapper() });

		expect(getForecast).not.toHaveBeenCalled();
		expect(result.current.status).toBe("pending");
	});

	it("must calls getForecast with the selectedCity and 14 as day", async () => {
		renderHook(() => useDeepForecast("London"), { wrapper: createWrapper() });

		await waitFor(() => expect(getForecast).toHaveBeenCalledWith("London", 14));
	});

	it("must returns mapped data with all expected fields/values with correct data", async () => {
		vi.mocked(getForecast).mockResolvedValue(mockGetForecastData);
		const { result } = renderHook(() => useDeepForecast("London"), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual([
			{
				day: "01",
				icon: "https://website.com",
				dayOfWeek: "Thu",
				minTempC: "16°C",
				maxTempC: "28°C",
				precipitation: "0.22mm",
			},
			{
				day: "02",
				icon: "https://website.com",
				dayOfWeek: "Fri",
				minTempC: "12°C",
				maxTempC: "25°C",
				precipitation: "0.00mm",
			},
			{
				day: "03",
				icon: "https://website.com",
				dayOfWeek: "Sat",
				minTempC: "14°C",
				maxTempC: "27°C",
				precipitation: "0.10mm",
			},
		]);
	});

	it("set isError to true when getForecast rejects", async () => {
		vi.mocked(getForecast).mockRejectedValue("Error!");
		const { result } = renderHook(() => useDeepForecast("1234567"), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});

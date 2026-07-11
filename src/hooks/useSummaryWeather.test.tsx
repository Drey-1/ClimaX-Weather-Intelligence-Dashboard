import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrent } from "@/services/wheatherService";
import { useSummaryWeather } from "./useSummaryWeather";

vi.mock("../services/wheatherService.ts");

const mockGetCurrentData = {
	current: {
		condition: {
			icon: "https://website.com",
			text: "Sunny",
		},
		temp_c: 21.21,
		wind_kph: 12,
		humidity: 67,
		vis_km: 3,
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

describe("useSummaryWeather", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must not call getCurrent when selectedCity is empty", () => {
		renderHook(() => useSummaryWeather(""), { wrapper: createWrapper() });

		expect(getCurrent).not.toHaveBeenCalled();
	});

	it("must call getCurrent with the selected city", () => {
		renderHook(() => useSummaryWeather("London"), { wrapper: createWrapper() });

		expect(getCurrent).toHaveBeenCalledWith("London");
	});

	it("must returns mapped data with icon, tempC, text, wind, humidity and visibility", async () => {
		vi.mocked(getCurrent).mockResolvedValue(mockGetCurrentData);
		const { result } = renderHook(() => useSummaryWeather("London"), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual({
			humidity: "67%",
			icon: "https://website.com",
			tempC: "21°",
			text: "Sunny",
			visibility: "3km",
			wind: "12km/h",
		});
	});

    it("must sets isError to true when getCurrent rejects", async () => {
		vi.mocked(getCurrent).mockRejectedValue(new Error("Error!"));
		const { result } = renderHook(() => useSummaryWeather("London"), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getForecast } from "@/services/wheatherService";
import { useFavoritesWeather } from "./useFavoritesWeather";

vi.mock("../services/wheatherService.ts");

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

const mockFavorites = ["London", "Paris"];

describe("useFavoritesWeather", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must not run the query when favorites is an empty array", () => {
		renderHook(() => useFavoritesWeather([]), { wrapper: createWrapper() });

		expect(getForecast).not.toHaveBeenCalled();
	});

	it("must calls getForecast once per city in favorites, with 1 as day", () => {
		renderHook(() => useFavoritesWeather(mockFavorites), { wrapper: createWrapper() });

		expect(getForecast).toHaveBeenCalledTimes(mockFavorites.length);
		expect(getForecast).toHaveBeenCalledWith("London", 1);
        expect(getForecast).toHaveBeenCalledWith("Paris", 1);
	});

	it("must returns mapped data with icon, name, tempC, maxTempC and minTempC for each city", async () => {
		vi.mocked(getForecast).mockImplementation(async (city: string) => {
			const data: Record<string, any> = {
				London: {
					current: {
						condition: {
							icon: "https://website.com",
						},
						temp_c: 25.12,
					},
					location: {
						name: "London",
					},
					forecast: {
						forecastday: [
							{
								day: {
									maxtemp_c: 23.33,
									mintemp_c: 11.42,
								},
							},
						],
					},
				},
				Paris: {
					current: {
						condition: {
							icon: "https://website.com",
						},
						temp_c: 24.32,
					},
					location: {
						name: "Paris",
					},
					forecast: {
						forecastday: [
							{
								day: {
									maxtemp_c: 28.09,
									mintemp_c: 15.21,
								},
							},
						],
					},
				},
			};
			return data[city];
		});
		const { result } = renderHook(() => useFavoritesWeather(mockFavorites), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual([
			{
				icon: "https://website.com",
				maxTempC: "23",
				minTempC: "11",
				name: "London",
				tempC: "25",
			},
			{
				icon: "https://website.com",
				maxTempC: "28",
				minTempC: "15",
				name: "Paris",
				tempC: "24",
			},
		]);
	});

	it("must sets isError to true when any of the getForecast calls rejects", async () => {
		vi.mocked(getForecast).mockImplementation(async (city: string) => {
            const data: Record<string, any> = {
                London: {
					current: {
						condition: {
							icon: "https://website.com",
						},
						temp_c: 25.12,
					},
					location: {
						name: "London",
					},
					forecast: {
						forecastday: [
							{
								day: {
									maxtemp_c: 23.33,
									mintemp_c: 11.42,
								},
							},
						],
					},
				},
            }
        })
		const { result } = renderHook(() => useFavoritesWeather(["London", "123"]), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});

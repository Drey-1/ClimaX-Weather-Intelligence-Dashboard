import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrent } from "@/services/wheatherService";
import { useNowCitiesWeathers } from "./useNowCitiesWeathers";

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

describe("useNowCitiesWeathers", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must not run the query when favorites is an empty array", () => {
		renderHook(() => useNowCitiesWeathers([]), { wrapper: createWrapper() });

		expect(getCurrent).not.toHaveBeenCalled();
	});

	it("must calls getCurrent once for each city in favorites", () => {
		renderHook(() => useNowCitiesWeathers(mockFavorites), { wrapper: createWrapper() });

		expect(getCurrent).toHaveBeenCalledTimes(mockFavorites.length);
		expect(getCurrent).toHaveBeenCalledWith("London");
		expect(getCurrent).toHaveBeenCalledWith("Paris");
	});

	it("must returns mapped data with icon, name and tempC for each city", async () => {
		vi.mocked(getCurrent).mockImplementation((city: string) => {
			const data: Record<string, any> = {
				London: {
					current: {
						condition: {
							icon: "https://website.com",
						},
						temp_c: 18.23,
					},
					location: {
						name: "London",
					},
				},
				Paris: {
					current: {
						condition: {
							icon: "https://website.com",
						},
						temp_c: 20.14,
					},
					location: {
						name: "Paris",
					},
				},
			};
			return data[city];
		});
		const { result } = renderHook(() => useNowCitiesWeathers(mockFavorites), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual([
			{
				icon: "https://website.com",
				name: "London",
				tempC: "18",
			},
			{
				icon: "https://website.com",
				name: "Paris",
				tempC: "20",
			},
		]);
	});

    it("must sets isError to true when any of the getCurrent calls rejects", async () => {
		vi.mocked(getCurrent).mockImplementation((city: string) => {
			const data: Record<string, any> = {
				London: {
					current: {
						condition: {
							icon: "https://website.com",
						},
						temp_c: 18.23,
					},
					location: {
						name: "London",
					},
				},
				Paris: {
					current: {
						condition: {
							icon: "https://website.com",
						},
						temp_c: 20.14,
					},
					location: {
						name: "Paris",
					},
				},
			};
			return data[city];
		});
		const { result } = renderHook(() => useNowCitiesWeathers(["London", "123"]), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});

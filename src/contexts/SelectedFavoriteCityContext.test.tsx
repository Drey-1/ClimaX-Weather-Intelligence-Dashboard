import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import { loadFavorites } from "@/services/localStorage";
import { getCurrent } from "@/services/wheatherService";
import { FavoritesCitiesProvider } from "./FavoritesContext";
import { SelectedFavoriteProvider, useSelectedFavoriteCity } from "./SelectedFavoriteCityContext";
import { act } from "react";

vi.mock("../services/localStorage.ts");
vi.mock("../services/wheatherService.ts");

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			<FavoritesCitiesProvider>
				<SelectedFavoriteProvider>{children}</SelectedFavoriteProvider>
			</FavoritesCitiesProvider>
		</QueryClientProvider>
	);
};

const mockCityWeatherData = (cityName: string) => ({
	current: {
		condition: { icon: "https://website.com" },
		temp_c: 24,
	},
	location: { name: cityName },
});

describe("useSelectedFavoriteCity", () => {
	it("must throws an error when used outside of SelectedFavoriteProvider", () => {
		const hook = () => renderHook(() => useSelectedFavoriteCity());

		expect(hook).toThrow("useSelectedFavoriteCity must be used within SelectedFavoriteProvider");
	});

	it("must initializes selectedCity as null before weather data resolves", () => {
		const { result } = renderHook(() => useSelectedFavoriteCity(), { wrapper: createWrapper() });

		expect(result.current.selectedCity).toBe(null);
	});

	it("must automatically selects the first city from nowCitiesWeathers once data loads", async () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		vi.mocked(getCurrent).mockImplementation(async (city: string) => mockCityWeatherData(city));
		const { result } = renderHook(() => useSelectedFavoriteCity(), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.selectedCity).not.toBeNull());
		expect(result.current.selectedCity).toBe("London");
	});

    it("must change selectedCity and not override once it has been set", async () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		vi.mocked(getCurrent).mockImplementation(async (city: string) => mockCityWeatherData(city));
		const { result } = renderHook(() => useSelectedFavoriteCity(), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.selectedCity).toBe("London"));

        act(() => {
            result.current.setSelectedCity("Paris")
        })

        expect(result.current.selectedCity).toBe("Paris");
	});
});

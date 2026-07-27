import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useFavoritesWeather } from "@/hooks/useFavoritesWeather";
import { RouteComponent as FavoriteRoute } from "@/routes/favorites";

vi.mock("@/contexts/FavoritesContext");
vi.mock("@/hooks/useFavoritesWeather");
vi.mock("@/components/FavoriteCard", () => ({
	default: ({ name }: { name: string }) => <div data-testid="favorite-card">{name}</div>,
}));
vi.mock("@/components/SearchDialog", () => ({
	default: () => <div data-testid="search-dialog" />,
}));

const mockFavoritesWeatherData = [
				{ icon: "https://website.com", name: "London", tempC: 25, maxTempC: 28, minTempC: 15 },
				{ icon: "https://website.com", name: "Paris", tempC: 26, maxTempC: 30, minTempC: 15 },
				{ icon: "https://website.com", name: "New York", tempC: 22, maxTempC: 27, minTempC: 11 },
			]

describe("Favorites Route", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.mocked(useFavorites).mockReturnValue({
			favorites: ["London", "Paris", "New York"],
		} as any);
	});

	it("must renders loading skeletons and the 'add city' dialog trigger when isPending is true", () => {
		vi.mocked(useFavoritesWeather).mockReturnValue({
			data: undefined,
			isError: false,
			isPending: true,
		} as any);
		render(<FavoriteRoute />);

		const skeletons = document.querySelectorAll(".animate-pulse");
		const dialog = document.querySelector(".border-dashed");

		expect(skeletons.length).toBeGreaterThan(0);
		expect(dialog).toBeInTheDocument();
	});

	it("must renders an error message when isError is true", () => {
		vi.mocked(useFavoritesWeather).mockReturnValue({
			data: undefined,
			isError: true,
			isPending: false,
		} as any);
		render(<FavoriteRoute />);

		const errorMsg = screen.getByText("Error loading data.");

		expect(errorMsg).toBeInTheDocument();
	});

	it("must renders one FavoriteCard per city in citiesWeathers", () => {
		vi.mocked(useFavoritesWeather).mockReturnValue({
			data: mockFavoritesWeatherData,
			isError: false,
			isPending: false,
		} as any);
		render(<FavoriteRoute />);

		const cards = screen.getAllByTestId("favorite-card");

		expect(cards).toHaveLength(3);
	});

    it("must renders the 'add city' dialog trigger alongside the favorite cards", () => {
		vi.mocked(useFavoritesWeather).mockReturnValue({
			data: mockFavoritesWeatherData,
			isError: false,
			isPending: false,
		} as any);
		render(<FavoriteRoute />);

		const dialog = document.querySelector(".border-dashed");

		expect(dialog).toBeInTheDocument();
	});

    it("must includes SearchDialog inside the Dialog", () => {
		vi.mocked(useFavoritesWeather).mockReturnValue({
			data: mockFavoritesWeatherData,
			isError: false,
			isPending: false,
		} as any);
		render(<FavoriteRoute />);

		const plusBtn = document.querySelector(".lucide-plus")

        fireEvent.click(plusBtn)

        const searchDialog = screen.getByTestId("search-dialog")

		expect(searchDialog).toBeInTheDocument();
	});
});

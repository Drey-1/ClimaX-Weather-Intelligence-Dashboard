import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useCitySearch } from "@/hooks/useCitySearch";
import type { usedCityType } from "@/types/citiesTypes";
import SearchDialog from "./SearchDialog";
import { Dialog } from "./ui/dialog";

vi.mock("@/contexts/FavoritesContext");
vi.mock("@/contexts/NotificationContext");
vi.mock("@/contexts/SelectedCityContext");
vi.mock("@/hooks/useCitySearch");

const mockCityList = [
	{ id: 2801268, city: "London" },
	{ id: 1720371, city: "Long Beach" },
	{ id: 2907124, city: "Londrina" },
];

const setupMocks = (
	overrides: {
		citySearch?: Partial<ReturnType<typeof useCitySearch>>;
		favorites?: Partial<ReturnType<typeof useFavorites>>;
		selectedCity?: Partial<ReturnType<typeof useSelectedCity>>;
		notification?: ReturnType<typeof useNotification>["notification"];
	} = {},
) => {
	vi.mocked(useCitySearch).mockReturnValue({
		query: "Lon",
		setQuery: vi.fn(),
		cityList: mockCityList as usedCityType[],
		isPending: false,
		isError: false,
		...overrides.citySearch,
	});
	vi.mocked(useFavorites).mockReturnValue({
		isFavorited: vi.fn(),
		toggleFavorite: vi.fn(),
		favorites: [],
		...overrides.favorites,
	});
	vi.mocked(useSelectedCity).mockReturnValue({
		changeSelectedCity: vi.fn(),
		selectedCity: "",
		...overrides.selectedCity,
	});
	vi.mocked(useNotification).mockReturnValue({
		notification: overrides.notification ?? vi.fn(),
	});
};

describe("SearchDialog", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must renders the input with the current query value", () => {
		setupMocks({ citySearch: { isPending: true, cityList: [] } });
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		expect(screen.getByPlaceholderText("City Name:")).toHaveValue("Lon");
	});

	it("must calls setQuery when the input value changes", () => {
		const mockSetQuery = vi.fn();
		setupMocks({ citySearch: { isPending: true, cityList: [], setQuery: mockSetQuery } });
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);
		const input = screen.getByPlaceholderText("City Name:");

		fireEvent.change(input, { target: { value: "Lond" } });

		expect(mockSetQuery).toHaveBeenCalledWith("Lond");
	});

	it("must shows 'Loading...' when isPending is true", () => {
		setupMocks({ citySearch: { isPending: true, cityList: [] } });
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("must shows an error message when isError is true", () => {
		setupMocks({ citySearch: { isError: true, cityList: [] } });
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		expect(screen.getByText("Error loading data.")).toBeInTheDocument();
	});

	it("must renders one suggestion row per city in cityList", () => {
		setupMocks();
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		const rows = document.body.querySelectorAll(".justify-between");

		expect(rows).toHaveLength(3);
	});

	it("must calls changeSelectedCity and notification when a city row is clicked", () => {
		const mockChangeSelectedCity = vi.fn();
		const mockNotification = vi.fn();
		setupMocks({
			selectedCity: { changeSelectedCity: mockChangeSelectedCity },
			notification: mockNotification,
		});
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		const city1 = screen.getByText("London");

		fireEvent.click(city1);

		expect(mockChangeSelectedCity).toHaveBeenCalledWith("London");
		expect(mockNotification).toHaveBeenCalledWith("Main city changed to London");
	});

	it("must calls toggleFavorite when the star icon is clicked, without triggering changeSelectedCity", () => {
		const mockToggleFavorite = vi.fn();
		const mockChangeSelectedCity = vi.fn();
		setupMocks({
			selectedCity: { changeSelectedCity: mockChangeSelectedCity },
			favorites: { toggleFavorite: mockToggleFavorite },
		});
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		const london = screen.getByText("London");
		const favBtn = london.closest(".group")?.querySelector(".lucide-star");

		fireEvent.click(favBtn);

		expect(mockToggleFavorite).toHaveBeenCalledWith("London");
		expect(mockChangeSelectedCity).not.toHaveBeenCalled();
	});

	it("must renders the star as filled when isFavorited returns true", () => {
		setupMocks({ favorites: { isFavorited: () => true } });
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		const london = screen.getByText("London");
		const favBtn = london.closest(".group")?.querySelector(".lucide-star");

		expect(favBtn).toHaveAttribute("fill", "currentColor");
	});

	it("must renders the star as not filled when isFavorited returns false", () => {
		setupMocks({ favorites: { isFavorited: () => false } });
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		const london = screen.getByText("London");
		const favBtn = london.closest(".group")?.querySelector(".lucide-star");

		expect(favBtn).toHaveAttribute("fill", "none");
	});

	it("must calls notification with 'removed' message when toggling a favorited city", () => {
		const mockNotification = vi.fn();
		setupMocks({ favorites: { isFavorited: () => true }, notification: mockNotification });
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		const london = screen.getByText("London");
		const favBtn = london.closest(".group")?.querySelector(".lucide-star");

		fireEvent.click(favBtn);

		expect(mockNotification).toHaveBeenCalledWith("London was removed from your favorites list");
	});

	it("must calls notification with 'added' message when toggling a unfavorited city", () => {
		const mockNotification = vi.fn();
		setupMocks({ favorites: { isFavorited: () => false }, notification: mockNotification });
		render(
			<Dialog open>
				<SearchDialog />
			</Dialog>,
		);

		const london = screen.getByText("London");
		const favBtn = london.closest(".group")?.querySelector(".lucide-star");

		fireEvent.click(favBtn);

		expect(mockNotification).toHaveBeenCalledWith("London has been added to your favorites list");
	});
});

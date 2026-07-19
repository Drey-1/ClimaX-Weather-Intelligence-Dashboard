import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useNotification } from "@/contexts/NotificationContext";
import { useSelectedFavoriteCity } from "@/contexts/SelectedFavoriteCityContext";
import { useNowCitiesWeathers } from "@/hooks/useNowCitiesWeathers";
import FavoriteCarousel from "./FavoriteCarousel";

vi.mock("@/contexts/FavoritesContext", () => ({
	useFavorites: () => ({
		favorites: ["London", "Paris"],
	}),
}));
vi.mock("@/contexts/NotificationContext");
vi.mock("@/contexts/SelectedFavoriteCityContext");
vi.mock("@/hooks/useNowCitiesWeathers");
vi.mock("@tanstack/react-router", () => ({
	Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
		<a href={to}>{children}</a>
	),
}));

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});
vi.stubGlobal(
	"IntersectionObserver",
	class {
		observe = vi.fn();
		unobserve = vi.fn();
		disconnect = vi.fn();
	},
);

describe("FavoriteCarousel", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.mocked(useNotification).mockReturnValue({
			notification: vi.fn(),
		});
	});
	it("must renders 3 loading placeholders when isPending is true", () => {
		vi.mocked(useNowCitiesWeathers).mockReturnValue({
			data: [],
			isPending: true,
			isError: false,
		} as any);
		vi.mocked(useSelectedFavoriteCity).mockReturnValue({
			selectedCity: "London",
			setSelectedCity: vi.fn(),
		});
		const { container } = render(<FavoriteCarousel />);

		const skeletons = container.querySelectorAll(".bg-card");

		expect(skeletons).toHaveLength(3);
	});

	it("must renders an error message when isError is true", () => {
		vi.mocked(useNowCitiesWeathers).mockReturnValue({
			data: [],
			isPending: false,
			isError: true,
		} as any);
		vi.mocked(useSelectedFavoriteCity).mockReturnValue({
			selectedCity: "London",
			setSelectedCity: vi.fn(),
		});
		render(<FavoriteCarousel />);

		const errorMsg = screen.getByText("Error loading data.");

		expect(errorMsg).toBeInTheDocument();
	});

	it("must renders one card per city when data is available", () => {
		vi.mocked(useNowCitiesWeathers).mockReturnValue({
			data: [
				{
					icon: "https://website.com",
					name: "London",
					tempC: 24,
				},
				{
					icon: "https://website.com",
					name: "Paris",
					tempC: 26,
				},
			],
			isPending: false,
			isError: false,
		} as any);
		vi.mocked(useSelectedFavoriteCity).mockReturnValue({
			selectedCity: "London",
			setSelectedCity: vi.fn(),
		});
		const { container } = render(<FavoriteCarousel />);

		const cards = container.querySelectorAll(".w-60");

		expect(cards).toHaveLength(2);
	});

	it("must displays name, tempC and icon for each city", () => {
		vi.mocked(useNowCitiesWeathers).mockReturnValue({
			data: [
				{
					icon: "https://website.com",
					name: "London",
					tempC: 24,
				},
			],
			isPending: false,
			isError: false,
		} as any);
		vi.mocked(useSelectedFavoriteCity).mockReturnValue({
			selectedCity: "London",
			setSelectedCity: vi.fn(),
		});
		const { container } = render(<FavoriteCarousel />);

		const name = screen.getByText("London");
		const tempC = screen.getByText("24°C");
		const icon = container.querySelector("img");

		expect(name).toBeInTheDocument();
		expect(tempC).toBeInTheDocument();
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveAttribute("src", "https://website.com");
	});

	it("must calls setSelectedCity and notification with the city name when a card is clicked", () => {
		const mockSetSelectedCity = vi.fn();
		const mockNotification = vi.fn();
		vi.mocked(useNowCitiesWeathers).mockReturnValue({
			data: [
				{
					icon: "https://website.com",
					name: "London",
					tempC: 24,
				},
				{
					icon: "https://website.com",
					name: "Paris",
					tempC: 26,
				},
			],
			isPending: false,
			isError: false,
		} as any);
		vi.mocked(useSelectedFavoriteCity).mockReturnValue({
			selectedCity: "London",
			setSelectedCity: mockSetSelectedCity,
		});
		vi.mocked(useNotification).mockReturnValue({
			notification: mockNotification,
		});
		render(<FavoriteCarousel />);

		const unselectedCard = screen.getByText("Paris")
		fireEvent.click(unselectedCard);

		expect(mockSetSelectedCity).toHaveBeenCalledWith("Paris");
		expect(mockNotification).toHaveBeenCalledWith("Selected city changed to Paris");
	});

	it("must applies the selected styling class when a city matches selectedCity", () => {
		const mockSetSelectedCity = vi.fn();
		const mockNotification = vi.fn();
		vi.mocked(useNowCitiesWeathers).mockReturnValue({
			data: [
				{
					icon: "https://website.com",
					name: "London",
					tempC: 24,
				},
				{
					icon: "https://website.com",
					name: "Paris",
					tempC: 26,
				},
			],
			isPending: false,
			isError: false,
		} as any);
		vi.mocked(useSelectedFavoriteCity).mockReturnValue({
			selectedCity: "Paris",
			setSelectedCity: mockSetSelectedCity,
		});
		vi.mocked(useNotification).mockReturnValue({
			notification: mockNotification,
		});
		render(<FavoriteCarousel />);

		const selectedCard = screen.getByText("Paris")
		const unselectedCard = screen.getByText("London")

		expect(selectedCard.parentElement).toHaveClass("text-accent");;
		expect(unselectedCard.parentElement).not.toHaveClass("text-accent");;
	});
});

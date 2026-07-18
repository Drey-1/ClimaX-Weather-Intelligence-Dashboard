import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FavoriteCards from "./FavoriteCard";

const mockToggleFavorite = vi.fn();
const mockNotification = vi.fn();

vi.mock("@/contexts/FavoritesContext", () => ({
	useFavorites: () => ({
		toggleFavorite: mockToggleFavorite,
	}),
}));
vi.mock("@/contexts/NotificationContext", () => ({
	useNotification: () => ({
		notification: mockNotification,
	}),
}));

const mockFavoriteCardProps = {
	icon: "https://website.com",
	maxTempC: 23,
	minTempC: 11,
	name: "London",
	tempC: 25,
};

describe("FavoriteCard", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});
	it("must renders name, tempC, minTempC and maxTempC with °C suffix", () => {
		render(<FavoriteCards {...mockFavoriteCardProps} />);

		const name = screen.getByText("London");
		const tempC = screen.getByText("25°C");
		const minTempC = screen.getByText("11°C");
		const maxTempC = screen.getByText("23°C");

		expect(name).toBeInTheDocument();
		expect(tempC).toBeInTheDocument();
		expect(minTempC).toBeInTheDocument();
		expect(maxTempC).toBeInTheDocument();
	});

	it("must renders the icon image with the correct src", () => {
		const { container } = render(<FavoriteCards {...mockFavoriteCardProps} />);
		const icon = container.querySelector("img");

		expect(icon).toBeInTheDocument();
		expect(icon).toHaveAttribute("src", "https://website.com");
	});

	it("must calls toggleFavorite with the city name when the star button is clicked", () => {
		render(<FavoriteCards {...mockFavoriteCardProps} />);

		const btn = screen.getByRole("button");
		fireEvent.click(btn);

		expect(mockToggleFavorite).toHaveBeenCalledWith("London");
	});

	it("must calls notification with a message containing the city name when star button is clicked", () => {
		render(<FavoriteCards {...mockFavoriteCardProps} />);

		const btn = screen.getByRole("button");
		fireEvent.click(btn);

		expect(mockNotification).toHaveBeenCalledWith("London removed from your favorties list");
	});
});

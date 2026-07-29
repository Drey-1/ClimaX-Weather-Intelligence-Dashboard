import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RouteComponent as DashboardRoute } from "@/routes/dashboard";

vi.mock("@/contexts/SelectedFavoriteCityContext", () => ({
	SelectedFavoriteProvider: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("@/components/DeepSchedule", () => ({
	default: () => <div data-testid="deep-schedule" />,
}));
vi.mock("@/components/FavoriteCarousel", () => ({
	default: () => <div data-testid="favorite-carousel" />,
}));
vi.mock("@/components/WeatherCalendar", () => ({
	default: () => <div data-testid="weather-calendar" />,
}));

describe("Dashboard Route", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.setSystemTime(new Date(2026, 0, 15));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("must renders FavoriteCarousel", () => {
		render(<DashboardRoute />);

		const favoriteCarousel = screen.getByTestId("favorite-carousel");

		expect(favoriteCarousel).toBeInTheDocument();
	});

	it("must displays the current month and year", () => {
		render(<DashboardRoute />);

		const date = screen.getByText("January 2026");

		expect(date).toBeInTheDocument();
	});

	it("must renders WeatherCalendar by default (simple modes)", () => {
		render(<DashboardRoute />);

		const weatherCalendar = screen.getByTestId("weather-calendar");

		expect(weatherCalendar).toBeInTheDocument();
	});

	it("must not render DeepSchedule by default", () => {
		render(<DashboardRoute />);

		const deepSchedule = screen.queryByTestId("deep-schedule");

		expect(deepSchedule).not.toBeInTheDocument();
	});

	it("must switches to DeepSchedule when the 'Deep' radio is selected", () => {
		render(<DashboardRoute />);

		const deepRadio = screen.getByRole("radio", { name: "Deep" });

		fireEvent.click(deepRadio);

		const deepSchedule = screen.getByTestId("deep-schedule");

		expect(deepSchedule).toBeInTheDocument();
	});

	it("must switches back to WeatherCalendar when 'Simple' is selected again", () => {
		render(<DashboardRoute />);

		const deepRadio = screen.getByRole("radio", { name: "Deep" });
		const simpleRadio = screen.getByRole("radio", { name: "Simple" });

		fireEvent.click(deepRadio);
		fireEvent.click(simpleRadio);

		const weatherCalendar = screen.getByTestId("weather-calendar");
		const deepSchedule = screen.queryByTestId("deep-schedule");

		expect(weatherCalendar).toBeInTheDocument();
		expect(deepSchedule).not.toBeInTheDocument();
	});
});

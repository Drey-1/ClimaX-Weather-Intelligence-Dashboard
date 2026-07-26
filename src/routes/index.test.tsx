import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RouteComponent as IndexRoute } from "@/routes/index";

vi.mock("@/components/SummaryCard", () => ({
	default: () => <div data-testid="summary-card" />,
}));
vi.mock("@/components/ForecastCard", () => ({
	default: () => <div data-testid="forecast-card" />,
}));
vi.mock("@/components/WeatherChart", () => ({
	default: () => <div data-testid="weather-chart" />,
}));

describe("Index Route", () => {
	it("must renders SummaryCard, ForecastCard and WeatherChart", () => {
		render(<IndexRoute />);

		const summaryCard = screen.getByTestId("summary-card");
		const forecastCard = screen.getByTestId("forecast-card");
		const weatherChart = screen.getByTestId("weather-chart");

		expect(summaryCard).toBeInTheDocument();
		expect(forecastCard).toBeInTheDocument();
		expect(weatherChart).toBeInTheDocument();
	});
});

import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useSummaryWeather } from "@/hooks/useSummaryWeather";
import SummaryCard from "./SummaryCard";

vi.mock("@/contexts/SelectedCityContext");
vi.mock("@/hooks/useSummaryWeather");

describe("SummaryCard", () => {
	beforeEach(() => {
		vi.setSystemTime(new Date(2026, 0, 15));
        vi.mocked(useSelectedCity).mockReturnValue({
			selectedCity: "London",
			changeSelectedCity: vi.fn(),
		});
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("must renders loading skeletons when isPending is true", () => {
		vi.mocked(useSummaryWeather).mockReturnValue({
			data: undefined,
			isError: false,
			isPending: true,
		});
		render(<SummaryCard />);

		const skeletons = document.querySelectorAll(".animate-pulse");

		expect(skeletons).toHaveLength(2);
	});

	it("must renders an error message when isError is true", () => {
		vi.mocked(useSummaryWeather).mockReturnValue({
			data: undefined,
			isError: true,
			isPending: false,
		});
		render(<SummaryCard />);

		const errorMsg = screen.getByText("Error loading data.");

		expect(errorMsg).toBeInTheDocument();
	});

	it("must displays the formatted current date and selected city", () => {
		vi.mocked(useSummaryWeather).mockReturnValue({
			data: {},
			isError: false,
			isPending: false,
		});
		render(<SummaryCard />);

		const cityName = screen.getByText("London");
		const dateFormated = screen.getByText("Today, 15 Jan 26");

		expect(cityName).toBeInTheDocument();
		expect(dateFormated).toBeInTheDocument();
	});

	it("must displays text, tempC and icon from summaryWeather", () => {
		vi.mocked(useSummaryWeather).mockReturnValue({
			data: {
				icon: "https://website",
				tempC: "23°C",
				text: "Cloudy",
				wind: "16km/h",
				humidity: "79%",
				visibility: "8km",
			},
			isError: false,
			isPending: false,
		});
		render(<SummaryCard />);

		const text = screen.getByText("Cloudy");
        const tempC = screen.getByText("23°C");
        const icon = document.querySelector("img");

		expect(text).toBeInTheDocument();
		expect(tempC).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("src", "https://website")
	});

    it("must renders wind, humidity and visibility via InfoItem with the correct values", () => {
		vi.mocked(useSummaryWeather).mockReturnValue({
			data: {
				icon: "https://website",
				tempC: "23°C",
				text: "Cloudy",
				wind: "16km/h",
				humidity: "79%",
				visibility: "8.1km",
			},
			isError: false,
			isPending: false,
		});
		render(<SummaryCard />);

		const wind = screen.getByText("16km/h");
        const humidity = screen.getByText("79%");
        const visibility = screen.getByText("8.1km");

		expect(wind).toBeInTheDocument();
		expect(humidity).toBeInTheDocument();
        expect(visibility).toBeInTheDocument();
	});
});

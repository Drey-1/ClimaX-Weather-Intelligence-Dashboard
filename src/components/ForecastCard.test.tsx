import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useNext7DaysWeather } from "@/hooks/useNext7DaysWeather";
import ForecastCard from "./ForecastCard";

vi.mock("../contexts/SelectedCityContext");
vi.mock("../hooks/useNext7DaysWeather");

describe("ForecastCard", () => {
	beforeEach(() => {
		vi.resetAllMocks();
        vi.mocked(useSelectedCity).mockReturnValue({
			selectedCity: "London",
			changeSelectedCity: vi.fn(),
		});
	});

	it("must renders 5 loading skeleton rows plus 1 sticky skeleton when isPending is true", () => {
		vi.mocked(useNext7DaysWeather).mockReturnValue({
			data: undefined,
			isPending: true,
			isError: false,
		} as any);
		const { container } = render(<ForecastCard />);

		const skeletons = container.querySelectorAll(".grid-cols-4");

		expect(skeletons).toHaveLength(6);
	});

	it("must renders an error message when isError is true", () => {
		vi.mocked(useNext7DaysWeather).mockReturnValue({
			data: undefined,
			isPending: false,
			isError: true,
		} as any);
		render(<ForecastCard />);

		const errorMsg = screen.getByText("Error loading data.");

		expect(errorMsg).toBeInTheDocument();
	});

	it("must renders one row per day in next7DaysWeather and a sticky one", () => {
		vi.mocked(useNext7DaysWeather).mockReturnValue({
			data: [
				{
					text: "Sunny",
					icon: "https://website.com",
					dayOfWeek: "Monday",
					minTempC: "16°C",
					maxTempC: "27°C",
				},
				{
					text: "Rainny",
					icon: "https://website.com",
					dayOfWeek: "Monday",
					minTempC: "18°C",
					maxTempC: "24°C",
				},
				{
					text: "Cloudy",
					icon: "https://website.com",
					dayOfWeek: "Monday",
					minTempC: "15°C",
					maxTempC: "22°C",
				},
			],
			isPending: false,
			isError: false,
		} as any);
		const { container } = render(<ForecastCard />);

		const rows = container.querySelectorAll(".grid-cols-3");

		expect(rows).toHaveLength(4);
	});

	it("must displays dayOfWeek, text, minTempC and maxTempC for each day", () => {
		vi.mocked(useNext7DaysWeather).mockReturnValue({
			data: [
				{
					text: "Sunny",
					icon: "https://website.com",
					dayOfWeek: "Monday",
					minTempC: "16°C",
					maxTempC: "27°C",
				},
			],
			isPending: false,
			isError: false,
		} as any);
		render(<ForecastCard />);

		const text = screen.getByText("Sunny");
		const dayOfWeek = screen.getByText("Monday");
		const minMaxTempC = screen.getByText("16°C/27°C");

		expect(text).toBeInTheDocument();
		expect(dayOfWeek).toBeInTheDocument();
		expect(minMaxTempC).toBeInTheDocument();
	});

	it("must renders the icon image with the correct src for each day", () => {
		vi.mocked(useNext7DaysWeather).mockReturnValue({
			data: [
				{
					text: "Sunny",
					icon: "https://website.com",
					dayOfWeek: "Monday",
					minTempC: "16°C",
					maxTempC: "27°C",
				},
			],
			isPending: false,
			isError: false,
		} as any);
		const { container } = render(<ForecastCard />);

		const icon = container.querySelector("img");

		expect(icon).toBeInTheDocument();
		expect(icon).toHaveAttribute("src", "https://website.com");
	});

	it("must always displays the 'Tomorrow' card using data from index 1, regardless of dayOfWeek at that index", () => {
		const mockData = [
			{
				text: "Sunny",
				icon: "https://website.com",
				dayOfWeek: "Monday",
				minTempC: "16°C",
				maxTempC: "27°C",
			},
			{
				text: "Rainny",
				icon: "https://website.com",
				dayOfWeek: "Monday",
				minTempC: "18°C",
				maxTempC: "24°C",
			},
			{
				text: "Cloudy",
				icon: "https://website.com",
				dayOfWeek: "Monday",
				minTempC: "15°C",
				maxTempC: "22°C",
			},
		];
		vi.mocked(useNext7DaysWeather).mockReturnValue({
			data: mockData,
			isPending: false,
			isError: false,
		} as any);
		render(<ForecastCard />);

		const tomorrowLabel = screen.getByText("Tommorow");
		expect(tomorrowLabel).toBeInTheDocument();

		const tomorrowCardContainer = tomorrowLabel.closest("div");

		expect(tomorrowCardContainer).toHaveTextContent(mockData[1].text);
		expect(tomorrowCardContainer).toHaveTextContent(
			mockData[1].minTempC + "/" + mockData[1].maxTempC,
		);
	});
});

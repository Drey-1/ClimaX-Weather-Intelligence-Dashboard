import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSelectedFavoriteCity } from "@/contexts/SelectedFavoriteCityContext";
import { useDeepForecast } from "@/hooks/useDeepForecast";
import DeepSchedule from "./DeepSchedule";

vi.mock("../contexts/SelectedFavoriteCityContext.tsx");
vi.mock("../hooks/useDeepForecast");

const mockDeepForecastData = [
	{
		day: "01",
		icon: "https://website.com",
		dayOfWeek: "Thu",
		minTempC: "16°C",
		maxTempC: "28°C",
		precipitation: "0.22mm",
	},
	{
		day: "02",
		icon: "https://website.com",
		dayOfWeek: "Fri",
		minTempC: "12°C",
		maxTempC: "25°C",
		precipitation: "0.00mm",
	},
	{
		day: "03",
		icon: "https://website.com",
		dayOfWeek: "Sat",
		minTempC: "14°C",
		maxTempC: "27°C",
		precipitation: "0.10mm",
	},
];

describe("DeepSchedule", () => {
	beforeEach(() => {
		vi.resetAllMocks();
        vi.mocked(useSelectedFavoriteCity).mockReturnValue({
			selectedCity: "London",
			setSelectedCity: vi.fn(),
		});
	});

	it("must renders 7 loadings skeletons when isPending is true", () => {	
		vi.mocked(useDeepForecast).mockReturnValue({
			data: undefined,
			isPending: true,
			isError: false,
		} as any);

		const { container } = render(<DeepSchedule />);

		const skeletons = container.querySelectorAll(".grid-cols-4");
		expect(skeletons).toHaveLength(7);
	});

	it("must renders an error message when isError is true", () => {
		vi.mocked(useDeepForecast).mockReturnValue({
			data: undefined,
			isPending: false,
			isError: true,
		} as any);

		render(<DeepSchedule />);

		const errorMsg = screen.getByText("Error loading data.");
		expect(errorMsg).toBeInTheDocument();
	});

	it("must renders one row per forecast day when data is available", () => {
		vi.mocked(useDeepForecast).mockReturnValue({
			data: mockDeepForecastData,
			isPending: false,
			isError: false,
		} as any);

		const { container } = render(<DeepSchedule />);

		const row = container.querySelectorAll(".grid-cols-4");
		expect(row).toHaveLength(3);
	});

	it("must displays day, dayOfWeek, minTempC, maxTempC and precipitation for each day", () => {
		vi.mocked(useDeepForecast).mockReturnValue({
			data: [
				{
					day: "01",
					icon: "https://website.com",
					dayOfWeek: "Thu",
					minTempC: "16°C",
					maxTempC: "28°C",
					precipitation: "0.22mm",
				},
			],
			isPending: false,
			isError: false,
		} as any);

		render(<DeepSchedule />);

		const day = screen.getByText("01");
		const dayOfWeek = screen.getByText("Thu");
		const minTempC = screen.getByText("16°C");
		const maxTempC = screen.getByText("28°C");
		const precipitation = screen.getByText("0.22mm");

		expect(day).toBeInTheDocument();
		expect(dayOfWeek).toBeInTheDocument();
		expect(minTempC).toBeInTheDocument();
		expect(maxTempC).toBeInTheDocument();
		expect(precipitation).toBeInTheDocument();
	});

	it("must renders the icon image with the correct src for each day", () => {
		vi.mocked(useDeepForecast).mockReturnValue({
			data: [
				{
					day: "01",
					icon: "https://website.com",
					dayOfWeek: "Thu",
					minTempC: "16°C",
					maxTempC: "28°C",
					precipitation: "0.22mm",
				},
			],
			isPending: false,
			isError: false,
		} as any);

		const { container } = render(<DeepSchedule />);
		const icon = container.querySelector("img");

        expect(icon).toBeInTheDocument()
		expect(icon).toHaveAttribute("src", "https://website.com");
	});
});

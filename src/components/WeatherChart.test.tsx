import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSelectedCity } from "@/contexts/SelectedCityContext";
import { useWeatherChart } from "@/hooks/useWeatherChart";
import { useWholeTodayWeather } from "@/hooks/useWholeTodayWeather";
import WeatherChart from "./WeatherChart";

vi.mock("@/contexts/SelectedCityContext");
vi.mock("@/hooks/useWeatherChart");
vi.mock("@/hooks/useWholeTodayWeather");
vi.mock("./Chart", () => ({
	Chart: ({ type, chartData }: { type: string; chartData: any[] }) => (
		<div data-testid="chart" data-type={type}>
			{JSON.stringify(chartData)}
		</div>
	),
}));

describe("WeatherChart", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.mocked(useSelectedCity).mockReturnValue({
			changeSelectedCity: vi.fn(),
			selectedCity: "London",
		});
	});

	it("must renders loading placeholder when isPending is true", () => {
		vi.mocked(useWholeTodayWeather).mockReturnValue({
			data: [],
			isPending: true,
			isError: false,
		} as any);
		vi.mocked(useWeatherChart).mockReturnValue({
			chartData: [],
			chartType: "hum",
			handleChange: vi.fn(),
		});
		render(<WeatherChart />);

		const chartSkeleton = document.querySelector(".animate-pulse");

		expect(chartSkeleton).toBeInTheDocument();
	});

	it("must renders an error message when isError is true", () => {
		vi.mocked(useWholeTodayWeather).mockReturnValue({
			data: [],
			isPending: false,
			isError: true,
		} as any);
		vi.mocked(useWeatherChart).mockReturnValue({
			chartData: [],
			chartType: "hum",
			handleChange: vi.fn(),
		});
		render(<WeatherChart />);

		const errorMsg = screen.getByText("Error loading data.");

		expect(errorMsg).toBeInTheDocument();
	});

	it("must renders three radio options: Temperature, Humidity, Rainfall", () => {
		vi.mocked(useWholeTodayWeather).mockReturnValue({
			data: [],
			isPending: false,
			isError: false,
		} as any);
		vi.mocked(useWeatherChart).mockReturnValue({
			chartData: [],
			chartType: "hum",
			handleChange: vi.fn(),
		});
		render(<WeatherChart />);

		const temp = screen.getByRole("radio", { name: "Temperature" });
		const hum = screen.getByRole("radio", { name: "Humidity" });
		const rain = screen.getByRole("radio", { name: "Rainfall" });

		expect(temp).toBeInTheDocument();
		expect(hum).toBeInTheDocument();
		expect(rain).toBeInTheDocument();
	});

	it("must marks the 'Temperature' radio as checked when chartType is 'temp'", () => {
		vi.mocked(useWholeTodayWeather).mockReturnValue({
			data: [],
			isPending: false,
			isError: false,
		} as any);
		vi.mocked(useWeatherChart).mockReturnValue({
			chartData: [],
			chartType: "temp",
			handleChange: vi.fn(),
		});
		render(<WeatherChart />);

		const temp = screen.getByRole("radio", { name: "Temperature" });

		expect(temp).toBeChecked();
	});

	it("must calls handleChange when a different radio option is selected", () => {
		const mockHandleChange = vi.fn();
		vi.mocked(useWholeTodayWeather).mockReturnValue({
			data: [],
			isPending: false,
			isError: false,
		} as any);
		vi.mocked(useWeatherChart).mockReturnValue({
			chartData: [],
			chartType: "temp",
			handleChange: mockHandleChange,
		});
		render(<WeatherChart />);

		const temp = screen.getByRole("radio", { name: "Temperature" });

		expect(temp).toBeChecked();

		const hum = screen.getByRole("radio", { name: "Humidity" });

		fireEvent.click(hum);

		expect(mockHandleChange).toHaveBeenCalled();
	});

	it("must passes the current chartType and chartData to Chart", () => {
		const mockChartData = [
			{
				hour: "00:00",
				value: 14,
			},
		];
		vi.mocked(useWholeTodayWeather).mockReturnValue({
			data: [],
			isPending: false,
			isError: false,
		} as any);
		vi.mocked(useWeatherChart).mockReturnValue({
			chartData: mockChartData,
			chartType: "temp",
			handleChange: vi.fn(),
		});
		render(<WeatherChart />);

		const chart = screen.getByTestId("chart");

		expect(chart).toHaveAttribute("data-type", "temp");
		expect(chart).toHaveTextContent(JSON.stringify(mockChartData));
	});
});

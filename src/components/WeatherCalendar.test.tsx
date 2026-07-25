import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSelectedFavoriteCity } from "@/contexts/SelectedFavoriteCityContext";
import { useWeatherCalendar } from "@/hooks/useWeatherCalendar";
import WeatherCalendar from "./WeatherCalendar";
import { format } from "date-fns";

vi.mock("@/contexts/SelectedFavoriteCityContext");
vi.mock("@/hooks/useWeatherCalendar");

describe("WeatherCalendar", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.setSystemTime(new Date(2026, 0, 15));
		vi.mocked(useSelectedFavoriteCity).mockReturnValue({
			selectedCity: "London",
			setSelectedCity: vi.fn(),
		});
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("must renders 35 loading skeletons when isPending is true", () => {
		vi.mocked(useWeatherCalendar).mockReturnValue({
			data: [],
			isPending: true,
			isError: false,
		});
		render(<WeatherCalendar />);

		const skeletons = document.querySelectorAll(".animate-pulse");

		expect(skeletons).toHaveLength(35);
	});

	it("must renders an error message when isError is true", () => {
		vi.mocked(useWeatherCalendar).mockReturnValue({
			data: [],
			isPending: false,
			isError: true,
		});
		render(<WeatherCalendar />);

		const errorMsg = screen.getByText("Error loading data.");

		expect(errorMsg).toBeInTheDocument();
	});

	it("must renders the 7 week day headers", () => {
		vi.mocked(useWeatherCalendar).mockReturnValue({
			data: [],
			isPending: false,
			isError: false,
		});
		render(<WeatherCalendar />);

		const sun = screen.getByText("Sunday");
		const mon = screen.getByText("Monday");
		const tue = screen.getByText("Tuesday");
		const wed = screen.getByText("Wednesday");
		const thu = screen.getByText("Thursday");
		const fri = screen.getByText("Friday");
		const sat = screen.getByText("Saturday");

		expect(sun).toBeInTheDocument();
		expect(mon).toBeInTheDocument();
		expect(tue).toBeInTheDocument();
		expect(wed).toBeInTheDocument();
		expect(thu).toBeInTheDocument();
		expect(fri).toBeInTheDocument();
		expect(sat).toBeInTheDocument();
	});

	it("must renders 35 day cells for the calendar grid", () => {
		const mock35Days = Array.from({ length: 14 }, (_, i) => ({
			icon: "https://website.com",
			date: format(new Date(2026, 0, i + 15),"yyyy-MM-dd"),
		}));
		vi.mocked(useWeatherCalendar).mockReturnValue({
			data: mock35Days,
			isPending: false,
			isError: false,
		});
		render(<WeatherCalendar />);

		const cells = document.querySelectorAll(".h-12");

		expect(cells).toHaveLength(35);
	});

	it("must marks today's cell with the 'Today' label", () => {
		const mock35Days = Array.from({ length: 14 }, (_, i) => ({
			icon: "https://website.com",
			date: format(new Date(2026, 0, i + 15),"yyyy-MM-dd"),
		}));
		vi.mocked(useWeatherCalendar).mockReturnValue({
			data: mock35Days,
			isPending: false,
			isError: false,
		});
		render(<WeatherCalendar />);

		const todayLabel = screen.getByText("Today");
		expect(todayLabel).toBeInTheDocument();

		const todayCell = todayLabel.closest("div");
		expect(todayCell).toHaveTextContent("15");
	});

	it("must marks tomorrow's cell with the 'Tomorrow' label", () => {
		const mock35Days = Array.from({ length: 14 }, (_, i) => ({
			icon: "https://website.com",
			date: format(new Date(2026, 0, i + 15),"yyyy-MM-dd"),
		}));
		vi.mocked(useWeatherCalendar).mockReturnValue({
			data: mock35Days,
			isPending: false,
			isError: false,
		});
		render(<WeatherCalendar />);

		const tomorrowLabel = screen.getByText("Tomorrow");
		expect(tomorrowLabel).toBeInTheDocument();

		const tomorrowCell = tomorrowLabel.closest("div");
		expect(tomorrowCell).toHaveTextContent("16");
	});

	it("must renders the forecast icon on the day that matches calendarIcons date", () => {
		const mock35Days = Array.from({ length: 14 }, (_, i) => ({
			icon: "https://website.com",
			date: format(new Date(2026, 0, i + 15),"yyyy-MM-dd"),
		}));
		vi.mocked(useWeatherCalendar).mockReturnValue({
			data: mock35Days,
			isPending: false,
			isError: false,
		});
		render(<WeatherCalendar />);

		const icons = document.querySelectorAll("img");

		expect(icons).toHaveLength(14);
		icons.forEach((img) => {
			expect(img).toHaveAttribute("src", "https://website.com");
		});
	});

    it("must not render an icon on days without matching forecast data", () => {
		const mock35Days = Array.from({ length: 14 }, (_, i) => ({
			icon: "https://website.com",
			date: format(new Date(2026, 0, i + 15),"yyyy-MM-dd"),
		}));
		vi.mocked(useWeatherCalendar).mockReturnValue({
			data: mock35Days,
			isPending: false,
			isError: false,
		});
		render(<WeatherCalendar />);

		const yesterdayCell = screen.getByText("14").closest("div")

		expect(yesterdayCell?.querySelector("img")).toBe(null)
	});
});

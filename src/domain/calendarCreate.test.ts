import { addDays, eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calendar } from "./calendarCreate";

describe("calendar", () => {
	beforeEach(() => {
		vi.setSystemTime(new Date(2026, 0, 1, 0, 0));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("returns an object with days, today and tomorrow", () => {
		const calendarObject = calendar();

		expect(calendarObject).toHaveProperty("days");
		expect(calendarObject).toHaveProperty("today");
		expect(calendarObject).toHaveProperty("tomorrow");
	});

	it("sets tomorrow as one day after today", () => {
		const { tomorrow, today } = calendar();

		const expectTommorow = addDays(today, 1)

		expect(tomorrow.getTime()).toBe(expectTommorow.getTime());
	});

	it("starts the days array on a Sunday", () => {
		const { days } = calendar();

		expect(days[0].toLocaleDateString("en-US", { weekday: "long" })).toBe("Sunday");
	});

	it("ends the days array on a Saturday", () => {
		const { days } = calendar();

		expect(days[days.length - 1].toLocaleDateString("en-US", { weekday: "long" })).toBe("Saturday");
	});

	it("includes every day of the current month", () => {
		const { days } = calendar();

		const today = new Date();
		const expectedDayOfMonth = eachDayOfInterval({
			start: startOfMonth(today),
			end: endOfMonth(today),
		});

		expect(days).toEqual(expect.arrayContaining(expectedDayOfMonth))
	});

	it("always returns a length that is a multiple of 7", () => {
		const { days } = calendar();

		expect(days.length % 7).toBe(0);
	});

	it("has no leading days when the month starts on a Sunday", () => {
		vi.setSystemTime(new Date(2026, 2, 1, 0, 0));
		const { days, today } = calendar();

		expect(days[0].getTime()).toBe(today.getTime());
	});

	it("has no trailing days when the month ends on a Saturday", () => {
		vi.setSystemTime(new Date(2026, 0, 31, 0, 0));
		const { days, today } = calendar();

		expect(days[days.length - 1].getTime()).toBe(today.getTime());
	});
});

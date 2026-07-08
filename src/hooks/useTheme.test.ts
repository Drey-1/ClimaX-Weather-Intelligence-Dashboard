import { renderHook } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadTheme, saveTheme } from "@/services/localStorage";
import { useTheme } from "./useTheme";

vi.mock("../services/localStorage.ts");

describe("useTheme", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	afterEach(() => {
		document.documentElement.classList.remove("dark");
	});

	it("must initializes isDarkMode as true when loadTheme returns 'dark'", () => {
		vi.mocked(loadTheme).mockReturnValue("dark");
		const { result } = renderHook(() => useTheme());

		expect(result.current.isDarkMode).toBe(true);
	});

	it("must initializes isDarkMode as false when loadTheme returns 'light'", () => {
		vi.mocked(loadTheme).mockReturnValue("light");
		const { result } = renderHook(() => useTheme());

		expect(result.current.isDarkMode).toBe(false);
	});

	it("must initializes isDarkMode as false when loadTheme returns null", () => {
		const { result } = renderHook(() => useTheme());

		expect(result.current.isDarkMode).toBe(false);
	});

	it("must toggles isDarkMode from false to true when toggleTheme is called", () => {
		const { result } = renderHook(() => useTheme());

		act(() => {
			result.current.toggleTheme();
		});

		expect(result.current.isDarkMode).toBe(true);
	});

	it("must toggles isDarkMode from true to false when toggleTheme is called", () => {
		vi.mocked(loadTheme).mockReturnValue("dark");
		const { result } = renderHook(() => useTheme());

		act(() => {
			result.current.toggleTheme();
		});

		expect(result.current.isDarkMode).toBe(false);
	});

	it("must adds 'dark' class to documentElement when isDarkMode is true", () => {
		vi.mocked(loadTheme).mockReturnValue("dark");
		renderHook(() => useTheme());

		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});

	it("must removes 'dark' class to documentElement when isDarkMode is true", () => {
		vi.mocked(loadTheme).mockReturnValue("light");
		renderHook(() => useTheme());

		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	it("must calls saveTheme with 'dark' when isDarkMode is false", () => {
        vi.mocked(loadTheme).mockReturnValue("light")
		const { result } = renderHook(() => useTheme());

		act(() => {
            result.current.toggleTheme()
        });

		expect(saveTheme).toHaveBeenCalledWith("dark");
	});

    it("must calls saveTheme with 'light' when isDarkMode is true", () => {
        vi.mocked(loadTheme).mockReturnValue("dark")
		const { result } = renderHook(() => useTheme());

		act(() => {
            result.current.toggleTheme()
        });

		expect(saveTheme).toHaveBeenCalledWith("light");
	});
});

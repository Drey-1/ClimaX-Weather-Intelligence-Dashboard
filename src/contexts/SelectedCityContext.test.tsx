import { renderHook } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadPrincipalCity, savePrincipalCity } from "@/services/localStorage";
import { SelectedCityProvider, useSelectedCity } from "./SelectedCityContext";

vi.mock("../services/localStorage.ts");

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<SelectedCityProvider>{children}</SelectedCityProvider>
);

describe("useSelectedCity", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must throws an error when used outside of SelectedCityProvider", () => {
		const hook = () => renderHook(() => useSelectedCity());
		expect(hook).toThrow("useSelectedCitys must be used within SelectedCityProvider");
	});

	it("must initializes selectedCity with the value from loadPrincipalCity when one exists", () => {
		vi.mocked(loadPrincipalCity).mockReturnValue("London");
		const { result } = renderHook(() => useSelectedCity(), { wrapper });

		expect(result.current.selectedCity).toBe("London");
	});

	it("must initializes selectedCity as 'New York' when loadPrincipalCity returns null", () => {
		vi.mocked(loadPrincipalCity).mockReturnValue(null);
		const { result } = renderHook(() => useSelectedCity(), { wrapper });

		expect(result.current.selectedCity).toBe("New York");
	});

	it("must calls savePrincipalCity with 'New York' when loadPrincipalCity returns null", () => {
		vi.mocked(loadPrincipalCity).mockReturnValue(null);
		renderHook(() => useSelectedCity(), { wrapper });

		expect(savePrincipalCity).toHaveBeenCalledWith("New York");
	});

	it("must not call savePrincipalCity on mount when a city is already stored", () => {
		vi.mocked(loadPrincipalCity).mockReturnValue("London");
		renderHook(() => useSelectedCity(), { wrapper });

		expect(savePrincipalCity).not.toHaveBeenCalled();
	});

	it("must updates selectedCity when changeSelectedCity is called", () => {
		vi.mocked(loadPrincipalCity).mockReturnValue("London");
		const { result } = renderHook(() => useSelectedCity(), { wrapper });

		act(() => {
			result.current.changeSelectedCity("Paris");
		});

		expect(result.current.selectedCity).toBe("Paris");
	});

	it("must calls savePrincipalCity when changeSelectedCity is called ", () => {
		vi.mocked(loadPrincipalCity).mockReturnValue("London");
		const { result } = renderHook(() => useSelectedCity(), { wrapper });

		act(() => {
			result.current.changeSelectedCity("Paris");
		});

		expect(savePrincipalCity).toHaveBeenCalledWith("Paris");
	});
});

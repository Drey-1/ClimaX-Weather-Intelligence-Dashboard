import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type React from "react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAutocomplete } from "@/services/wheatherService";
import { useCitySearch } from "./useCitySearch";

vi.mock("../services/wheatherService.ts");

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe("useCitySearch", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must initializes with 'New York' as the default query", () => {
		const { result } = renderHook(() => useCitySearch(), { wrapper: createWrapper() });

		expect(result.current.query).toBe("New York");
	});

	it("must calls getAutocomplete with the initial query on mount", () => {
		renderHook(() => useCitySearch(), { wrapper: createWrapper() });

		expect(getAutocomplete).toHaveBeenCalledWith("New York");
	});

	it("must returns cityList as an empty array by default (before data resolves)", () => {
		const { result } = renderHook(() => useCitySearch(), { wrapper: createWrapper() });

		expect(result.current.cityList).toEqual([]);
	});

	it("must maps the autocomplete response to { id, city } objects)", async () => {
		vi.mocked(getAutocomplete).mockResolvedValue([
			{
				id: 1,
				name: "New York",
				region: "NA",
				country: "USA",
				lat: 41.9,
				lon: 20.1,
				url: "https://website.com",
			},
		]);
		const { result } = renderHook(() => useCitySearch(), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isPending).toBe(false));
		expect(result.current.cityList[0]).toEqual({
			id: 1,
			city: "New York",
		});
	});

	it("must updates query and refetches when setQuery is called", async () => {
		const { result } = renderHook(() => useCitySearch(), { wrapper: createWrapper() });

		act(() => {
			result.current.setQuery("Paris");
		});

		await waitFor(() => expect(getAutocomplete).toHaveBeenCalledWith("Paris"));
	});

	it("must sets IsError to true when getAutocomplete rejects", async () => {
		vi.mocked(getAutocomplete).mockRejectedValue("Error!");
		const { result } = renderHook(() => useCitySearch(), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isError).toBe(true));
	});

	it("must not fetch when query is an empty string", async () => {
		const { result } = renderHook(() => useCitySearch(), { wrapper: createWrapper() });

		act(() => {
			result.current.setQuery("");
		});

		expect(getAutocomplete).toHaveBeenCalledTimes(1);
	});
});

import { renderHook } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadFavorites, saveFavorites } from "@/services/localStorage";
import { FavoritesCitiesProvider, useFavorites } from "./FavoritesContext";

vi.mock("../services/localStorage.ts");

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<FavoritesCitiesProvider>{children}</FavoritesCitiesProvider>
);

describe("useFavorites", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("must throws an error when used outside of FavoritesCitiesProvider", () => {
		const hook = () => renderHook(() => useFavorites());
		expect(hook).toThrow("useFavorites must be used within FavoritesCitiesProvider");
	});

	it("must initializes favorites with the parsed value from loadFavorites when one exists", () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		const { result } = renderHook(() => useFavorites(), { wrapper });

		expect(result.current.favorites).toEqual(["London", "Paris"]);
	});

	it("must initializes favorites as an empty array when loadFavorites returns null", () => {
		vi.mocked(loadFavorites).mockReturnValue(null);
		const { result } = renderHook(() => useFavorites(), { wrapper });

		expect(result.current.favorites).toEqual([]);
	});

	it("must calls saveFavorites with an empty array when loadFavorites returns null", () => {
		vi.mocked(loadFavorites).mockReturnValue(null);
		renderHook(() => useFavorites(), { wrapper });

		expect(saveFavorites).toHaveBeenCalledWith([]);
	});

	it("must not call saveFavorites on mount when favorites are already stored", () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		renderHook(() => useFavorites(), { wrapper });

		expect(saveFavorites).not.toHaveBeenCalled();
	});

	it("must adds a city to favorites when toggleFavorite is called with a non-favorited city", () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		const { result } = renderHook(() => useFavorites(), { wrapper });

		act(() => {
			result.current.toggleFavorite("New York");
		});

		expect(result.current.favorites).toEqual(["London", "Paris", "New York"]);
	});

	it("must removes a city from favorites when toggleFavorite is called with a favorited city", () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		const { result } = renderHook(() => useFavorites(), { wrapper });

		act(() => {
			result.current.toggleFavorite("Paris");
		});

		expect(result.current.favorites).toEqual(["London"]);
	});

	it("must calls saveFavorites with the updated array after toggleFavorite", () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		const { result } = renderHook(() => useFavorites(), { wrapper });

		act(() => {
			result.current.toggleFavorite("Paris");
		});

		expect(saveFavorites).toHaveBeenCalledWith(["London"]);
	});

    it("must isFavorited returns true for a city that is in favorites", () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		const { result } = renderHook(() => useFavorites(), { wrapper });

        expect(result.current.isFavorited("Paris")).toBe(true)
	});

    it("must isFavorited returns false for a city that isn't in favorites", () => {
		vi.mocked(loadFavorites).mockReturnValue('["London","Paris"]');
		const { result } = renderHook(() => useFavorites(), { wrapper });

        expect(result.current.isFavorited("New York")).toBe(false)
	});
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { FavoritesCitiesProvider } from "./contexts/FavoritesContext.tsx";
import { SelectedCityProvider } from "./contexts/SelectedCityContext.tsx";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SelectedCityProvider>
			<FavoritesCitiesProvider>
				<RouterProvider router={router} />
			</FavoritesCitiesProvider>
		</SelectedCityProvider>
	</StrictMode>,
);

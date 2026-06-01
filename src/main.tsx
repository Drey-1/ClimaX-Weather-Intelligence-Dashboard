import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { FavoritesCitiesProvider } from "./contexts/FavoritesContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import { SelectedCityProvider } from "./contexts/SelectedCityContext.tsx";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<NotificationProvider>
			<QueryClientProvider client={queryClient}>
				<SelectedCityProvider>
					<FavoritesCitiesProvider>
						<RouterProvider router={router} />
					</FavoritesCitiesProvider>
				</SelectedCityProvider>
			</QueryClientProvider>
		</NotificationProvider>
	</StrictMode>,
);

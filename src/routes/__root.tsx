import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";

export const Route = createRootRoute({
	component: RootComponent,
});

export function RootComponent() {
	return (
		<div className="bg-linear-to-b p-4 from-background-secondary to-background  flex flex-col gap-4 h-max">
			<Header />
			<Outlet />
		</div>
	);
}

import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";
import NotificationCard from "@/components/NotificationCard";

const message = null;

export const Route = createRootRoute({
	component: () => (
		<div className="bg-linear-to-b p-4 from-background-secondary to-background  flex flex-col gap-4 h-max">
			<Header />
			<Outlet />
			{message && <NotificationCard message={message} />}
		</div>
	),
});

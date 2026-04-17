import { Link } from "@tanstack/react-router";
import { Calendar, Grid2X2, MapPin, Star } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import SearchDialog from "./SearchDialog";
import { DialogTrigger } from "./ui/dialog";

export default function SideBar() {
	const inactiveClass = "text-card-foreground";
	const activeClass = "text-icons";

	return (
		<nav className="absolute left-4 top-20 flex flex-col bg-card gap-4 p-2 rounded-4xl animate-in fade-in slide-in-from-top-4 duration-500 z-50">
			<Link to="/" className={inactiveClass} activeProps={{ className: activeClass }}>
				<Grid2X2 size={34} />
			</Link>

			<Dialog>
				<DialogTrigger asChild className="cursor-pointer">
					<MapPin className={inactiveClass} size={34} />
				</DialogTrigger>
				<SearchDialog />
			</Dialog>

			<Link to="/dashboard" className={inactiveClass} activeProps={{ className: activeClass }}>
				<Calendar size={34} />
			</Link>

			<Link to="/favorites" className={inactiveClass} activeProps={{ className: activeClass }}>
				<Star size={34} />
			</Link>
		</nav>
	);
}

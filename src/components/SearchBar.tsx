import { Search, } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
} from "@/components/ui/dialog";
import SearchDialog from "./SearchDialog";

export default function SearchBar() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button type="button" className="flex p-2 gap-1 rounded-full w-lg bg-card cursor-pointer">
					<Search className="text-icons" />
					<p className="text-card-foreground">Search City...</p>
				</button>
			</DialogTrigger>
			<SearchDialog/>
		</Dialog>
	);
}

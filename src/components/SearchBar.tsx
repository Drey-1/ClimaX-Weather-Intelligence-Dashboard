import { MapPin, Search, Star } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function SearchBar() {
	const mock = [
		{
			location: "New York, USA",
			favorited: false,
		},
		{
			location: "Los Angeles, USA",
			favorited: false,
		},
		{
			location: "Paris, France",
			favorited: true,
		},
	];
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button type="button" className="flex p-2 gap-1 rounded-full w-lg bg-card cursor-pointer">
					<Search className="text-icons" />
					<p className="text-card-foreground">Search City...</p>
				</button>
			</DialogTrigger>
			<DialogContent showCloseButton={false} className="border border-card">
				<DialogHeader className="border-b border-card p-3">
					<DialogTitle className="flex">
						<input
							type="text"
							placeholder="City Name:"
							className="text-icons w-full  placeholder:text-card-foreground focus:outline-0 caret-icons"
							autoFocus
						/>
						<DialogClose asChild>
							<button
								type="button"
								className="text-sm text-card-foreground hover:text-background-secondary border border-card rounded-full px-2 py-1"
							>
								Esc
							</button>
						</DialogClose>
					</DialogTitle>
				</DialogHeader>
				<div className="p-2">
					<h3 className="text-sm p-2">Suggestions</h3>
					{mock.map((item) => {
						return (
							<div key={item.location} className="flex p-2 m-1 justify-between hover:bg-select group rounded-xl">
								<div className="flex gap-1 cursor-pointer">
									<MapPin className="text-card-foreground group-hover:-rotate-90 transition-transform group-hover:scale-115"/>
									<p className="text-icons">{item.location}</p>
								</div>
								<Star fill={item.favorited?"currentColor":"none"}
								stroke="currentColor"  className={"text-icons cursor-pointer"}/>
							</div>
						);
					})}
				</div>
			</DialogContent>
		</Dialog>
	);
}

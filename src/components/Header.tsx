import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "./ui/button";

export default function Header() {
	const [isMenuOpen, setMenuOpen] = useState(false);
	function switchMenu() {
		setMenuOpen(!isMenuOpen);
	}
	return (
		<header className="flex items-center justify-between gap-4">
			<div className="flex gap-4">
				<Button size={"lg"} onClick={switchMenu} className="rounded-full">
					{isMenuOpen ? <X /> : <MenuIcon />}
				</Button>
				<h1 className="text-4xl text-icons font-semibold">ClimaX</h1>
			</div>
			<SearchBar />
			<ThemeSwitch />
			{isMenuOpen && <SideBar />}
		</header>
	);
}

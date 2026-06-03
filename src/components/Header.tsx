import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import climaxLogo from "../assets/Logos/ClimaxLogo.webp";
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
		<header className="flex flex-col md:flex-row items-center justify-between gap-4">
			<div className="flex w-full justify-between sm:justify-normal items-center gap-4">
				<Button size={"lg"} onClick={switchMenu} className="rounded-full">
					{isMenuOpen ? <X /> : <MenuIcon />}
				</Button>
				<div className="flex gap-4">
					<img src={climaxLogo} alt="Climax logo" className="relative w-10 -right-2" />
					<h1 className="text-4xl text-icons font-semibold">ClimaX</h1>
				</div>
			</div>
			<SearchBar />
			<ThemeSwitch />
			{isMenuOpen && <SideBar />}
		</header>
	);
}

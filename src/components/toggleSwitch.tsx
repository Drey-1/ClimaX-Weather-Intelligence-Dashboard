import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ToggleSwitch() {
	const { toggleTheme, isDarkMode } = useTheme();

	return (
		<label className="relative inline-block w-18 h-9 group m-2">
			<input type="checkbox" onChange={toggleTheme} checked={isDarkMode} className="sr-only" />

			<div className="w-full h-full rounded-full border border-card ">
				<div className="flex p-1 justify-between">
					<Sun
						size={26}
						className="z-10 text-icons group-has-[input:checked]:text-card-foreground	"
					/>
					<Moon
						size={26}
						className="z-10 text-card-foreground group-has-[input:checked]:text-icons"
					/>
				</div>
				<div
					className={`absolute h-8 w-8  top-0.5 bg-foreground rounded-full transition  ${isDarkMode ? "right-0.5" : "left-0.5"}`}
				></div>
			</div>
		</label>
	);
}

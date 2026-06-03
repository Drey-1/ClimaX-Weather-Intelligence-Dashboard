import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeSwitch() {
	const { toggleTheme, isDarkMode } = useTheme();

	return (
		<div className="flex w-full sm:w-auto justify-end sm:justify-normal">
			<label className="relative inline-block w-20 h-10 group m-2">
				<input type="checkbox" onChange={toggleTheme} checked={isDarkMode} className="sr-only" />

				<div className="w-full h-full rounded-full border border-card ">
					<div className="flex p-1 justify-between">
						<Sun
							size={29}
							className="z-10 text-icons group-has-[input:checked]:text-card-foreground	"
						/>
						<Moon
							size={29}
							className="z-10 text-card-foreground group-has-[input:checked]:text-icons"
						/>
					</div>
					<div
						className={`absolute h-9 w-9  top-0.5 bg-foreground rounded-full transition  ${isDarkMode ? "right-0.5" : "left-0.5"} group-hover:brightness-90 dark:group-hover:brightness-110`}
					></div>
				</div>
			</label>
		</div>
	);
}

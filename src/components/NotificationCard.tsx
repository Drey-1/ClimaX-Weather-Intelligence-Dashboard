import type { notificationCardProps } from "@/types/notificationCardProps";


export default function NotificationCard({ message }: notificationCardProps) {
	return (
		<div className="bg-popover absolute right-0 top-18 rounded-l-2xl z-50 p-3 animate-in fade-in slide-in-from-right-20 duration-500">
			<h3 className="text-accent">Notification</h3>
			<p className="text-icons">{message}</p>
		</div>
	);
}

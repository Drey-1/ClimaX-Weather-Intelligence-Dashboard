import { createContext, useContext, useState } from "react";
import type { NotificationContextType, NotificationType } from "@/types/NotificationContextTypes";

const NOTIFICATION_DURATION_MS = 4000;

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
	const [notifications, setNotifications] = useState<NotificationType[]>([]);

	const notification = (message: string) => {
		const id = Date.now();
		setNotifications((prev) => [...prev, { id, message }]);
		setTimeout(
			() => setNotifications((prev) => prev.filter((notification) => notification.id !== id)),
			NOTIFICATION_DURATION_MS,
		);
	};

	return (
		<NotificationContext.Provider value={{ notification }}>
			{children}
			<div className="fixed top-20 right-5 flex flex-col-reverse gap-2">
				{notifications.map((notification) => (
					<div
						key={notification.id}
						className="bg-card border border-card-foreground rounded-xl px-5 py-4 w-72 shadow-sm relative overflow-hidden animate-slide-in"
					>
						<h1 className="text-sm font-medium text-icons mb-1">Notification</h1>
						<p className="text-xs text-icons">{notification.message}</p>
						<div className="absolute bottom-0 left-0 h-0.5 bg-icons animate-shrink" />
					</div>
				))}
			</div>
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);

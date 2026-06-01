type NotificationType = { id: number; message: string };
type NotificationContextType = { notification: (message: string) => void };

export type { NotificationType, NotificationContextType };

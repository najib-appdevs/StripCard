import { Bell } from "lucide-react";

export default function NotificationBell() {
  return (
    <button
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label="Notifications"
    >
      <Bell size={20} className="text-black" />
    </button>
  );
}

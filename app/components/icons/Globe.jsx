import { Globe } from "lucide-react";

export default function GlobeIcon() {
  return (
    <button
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
      aria-label="Language"
    >
      <Globe size={20} className="text-black" />
    </button>
  );
}

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logoutUser } from "../utils/api";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();

      // Success case — use whatever server sends
      if (data?.message?.success && Array.isArray(data.message.success)) {
        // Show the first success message (or join them)
        const successMsg = data.message.success.join(" • ");
        toast.success(successMsg);
      }
      // Fallback: if no success array but still 2xx response
      else if (data?.message) {
        const msg =
          typeof data.message === "string"
            ? data.message
            : JSON.stringify(data.message);
        toast.success(msg);
      }
    } catch (error) {
      // Error case — use server message if available
      console.error("Logout request failed:", error);

      if (error.response?.data?.message) {
        const msg = error.response.data.message;

        if (msg.error && Array.isArray(msg.error)) {
          // Most common in backend: "error"
          errorMsg = msg.error.join(" • ");
        } else if (Array.isArray(msg)) {
          errorMsg = msg.join(" • ");
        } else if (typeof msg === "string") {
          errorMsg = msg;
        } else if (msg.success) {
          // rare case: error response but has success array
          errorMsg = msg.success.join(" • ");
        }
      }

      toast.error(errorMsg);
    } finally {
      // Always clean up and redirect
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      router.push("/login");
    }
  };

  return { handleLogout };
};

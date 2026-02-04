import { Download } from "lucide-react";
import Image from "next/image";

const DownloadAuthenticatorApp = () => {
  return (
    <div
      className="
      bg-white dark:bg-gray-800 
      rounded-2xl 
      shadow-lg dark:shadow-gray-900/50 
      p-8 w-full 
      flex flex-col 
      border border-gray-200 dark:border-gray-700
      transition-colors duration-200
    "
    >
      <h2
        className="
        text-lg 
        text-gray-700 dark:text-gray-200 
        text-center mb-4 
        font-medium
      "
      >
        Download Google Authenticator App
      </h2>

      <p
        className="
        text-sm 
        text-gray-600 dark:text-gray-400 
        text-center mb-8 
        leading-relaxed
      "
      >
        Google Authenticator is a product-based authenticator by Google that
        provides two-factor authentication services for verifying users of
        various applications.
      </p>

      <div className="flex justify-center mb-8">
        <div
          className="
          bg-gray-100 dark:bg-gray-700 
          p-4 rounded-2xl 
          shadow-sm dark:shadow-gray-900/30
        "
        >
          <Image
            src="/google-authenticator.webp"
            alt="Google Authenticator"
            width={192}
            height={192}
            className="w-56 h-56 object-contain rounded-xl"
            priority
          />
        </div>
      </div>

      <a
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-auto block"
      >
        <button
          className="
            cursor-pointer w-full py-3 
            rounded-lg 
            text-white font-semibold text-base 
            transition-all duration-200 
            flex items-center justify-center gap-2
            bg-linear-to-r from-teal-500 to-green-500
            hover:from-teal-600 hover:to-green-600
            active:from-teal-700 active:to-green-700
            shadow-md hover:shadow-lg
          "
        >
          <Download className="w-5 h-5" />
          Download App
        </button>
      </a>
    </div>
  );
};

export default DownloadAuthenticatorApp;

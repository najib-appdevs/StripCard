import { Download } from "lucide-react";
import Image from "next/image";

const DownloadAuthenticatorApp = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col">
      <h2 className="text-lg text-gray-700 text-center mb-4">
        Download Google Authenticator App
      </h2>

      <p className="text-sm text-gray-600 text-center mb-8 leading-relaxed">
        Google Authenticator is a product based authenticator by Google that
        executes two-venture confirmation administrations for verifying clients
        of any programming applications.
      </p>

      <div className="flex justify-center mb-8">
        <Image
          src="/google-authenticator.webp"
          alt="Google Authenticator"
          width={192}
          height={192}
          className="w-56 h-56 object-contain rounded-2xl"
        />
      </div>

      <a
        href="https://play.google.com/store/apps"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-auto block"
      >
        <button
          className="cursor-pointer w-full py-3 rounded-lg text-white font-semibold text-base transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
          style={{
            background:
              "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
          }}
        >
          <Download className="w-5 h-5" />
          Download App
        </button>
      </a>
    </div>
  );
};

export default DownloadAuthenticatorApp;

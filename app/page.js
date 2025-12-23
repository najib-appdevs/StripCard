import Link from "next/link";

function RootHomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link
        href="/dashboard"
        className="px-5 py-2 btn-primary text-white rounded-md"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default RootHomePage;

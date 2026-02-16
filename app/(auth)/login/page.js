import Footer from "../../(Home)/components/Footer";
import Navbar from "../../(Home)/components/Navbar";
import LoginPage from "./LoginPage";

export const metadata = {
  title: "Login",
  description: "Secure login to your StripCard account",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <LoginPage />
      <Footer />
    </>
  );
}

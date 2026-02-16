import Footer from "../../(Home)/components/Footer";
import Navbar from "../../(Home)/components/Navbar";
import RegisterPage from "./RegisterPage";

export const metadata = {
  title: "Registration",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <RegisterPage />
      <Footer />
    </>
  );
}

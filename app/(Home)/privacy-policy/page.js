import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PrivacyPolicy from "../components/privacy-policy/PrivacyPolicy";

function page() {
  return (
    <main>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}

export default page;

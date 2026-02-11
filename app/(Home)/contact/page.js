import ContactUs from "../components/contactPageSections/ContactUs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "StripCard - Contact",
};

function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactUs />
      <Footer />
    </>
  );
}

export default ContactPage;

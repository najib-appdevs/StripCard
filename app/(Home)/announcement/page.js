import RecentAnnouncement from "../components/announcementPageSections/RecentAnnouncement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function page() {
  return (
    <main>
      <Navbar />
      <RecentAnnouncement />
      <Footer />
    </main>
  );
}

export default page;

import RecentAnnouncement from "../components/announcementPageSections/RecentAnnouncement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "StripCard - Announcement",
};

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

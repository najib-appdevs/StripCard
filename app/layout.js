import { Geist, Geist_Mono } from "next/font/google";
import DashboardLayoutClient from "./DashboardLayoutClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard App",
  description: "Next.js Dashboard with Sidebar & Navbar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardLayoutClient>{children}</DashboardLayoutClient>
      </body>
    </html>
  );
}

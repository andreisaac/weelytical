import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@components/layout/navbar";
import Footer from "@components/layout/footer";

export const metadata: Metadata = {
  title: "Weelytical",
  description: "Real-time analytics, and user-friendly dashboards that empower you to make data-driven decisions with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-[100vh] bg-white">
        <Navbar/>
        <div className="2xl:max-w-[1512px] mx-auto min-h-[100vh]">
            {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}

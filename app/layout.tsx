import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@components/layout/navbar";
import Footer from "@components/layout/footer";
import UserContext from "@context/userContext";
import ProjectsContext from "@context/projectsContext";
//import Weelytical from "weelytical-react";
import Weelytical from "weelytical-react";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <UserContext>
      <ProjectsContext>
      <body className="min-h-[100vh] bg-white">
        <Navbar/>
        <div className="2xl:max-w-[1512px] xl:mx-auto min-h-[100vh]">
          <SpeedInsights/>
          <Weelytical/>
          <Analytics/>
          {children}
        </div>
        <Footer/>
      </body>
      </ProjectsContext>
      </UserContext>
    </html>
  );
}

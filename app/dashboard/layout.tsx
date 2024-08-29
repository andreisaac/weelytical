import React, {Suspense} from "react";
import Dashbar from "./dashbar";
import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Dashboard",
    description: "Real-time analytics, and user-friendly dashboards that empower you to make data-driven decisions with confidence.",
  };

const Layout = ({children}:{children: React.ReactNode}) => {
    return (
        <main className="max-xl:mx-2 min-h-[88vh] mt-8 children rounded-b-xl shadow-2xl children">
          <Suspense>
          <Dashbar/>
          {children}
          </Suspense>
        </main>
    )
  }

export default Layout;
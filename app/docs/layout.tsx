import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
    description: "Real-time analytics, and user-friendly dashboards that empower you to make data-driven decisions with confidence.",
  };
  
const layout = async({
    children
  }: {
    children: React.ReactNode
  }) => {
    return (
        <main className="mt-10 rounded-xl text-n700">
            <div className="flex flex-row border border-n300 rounded-xl">
                <div className="py-8 px-20 flex flex-col w-80 gap-2 bg-n100 border-r border-n300  rounded-l-xl">
                    <Link href="/docs">Getting Started</Link>
                    <Link href="/docs/frameworks">Frameworks</Link>
                    <Link href="/docs/react">React JS</Link>
                </div>
                <div className="py-6 px-20 flex-1 flex flex-row min-h-[800px]">
                    {children}
                </div>
            </div>
        </main>
        
    )
  }


export default layout;
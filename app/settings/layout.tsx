import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
    description: "Real-time analytics, and user-friendly dashboards that empower you to make data-driven decisions with confidence.",
  };

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
        <main className="mt-10 border-2 border-n300 rounded-xl text-n700 shadow-2xl">
            <h2 className="py-8 px-20 bg-n100 border-b-2 border-n300 rounded-t-xl">Account Settings</h2>
            <div className="flex flex-row">
                <div className="py-8 px-20 flex flex-col w-80 gap-2">
                    <Link href="/settings">General</Link>
                    <Link href="/settings/teams">Teams</Link>
                    <Link href="/settings/authentication">Authentication</Link>
                    <Link href="/settings/billing">Billing</Link>
                    <Link href="/settings/invoices">Invoices</Link>
                </div>
                <div className="flex-1 flex flex-row">
                    {children}
                </div>
            </div>
        </main>
        
    )
  }

export default layout;
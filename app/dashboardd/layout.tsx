import React from "react";
import Dashbar from "./DashBar"
import type { Metadata } from "next";
import {createClient} from "@utils/supabase/server";


export const metadata: Metadata = {
    title: "Settings",
    description: "Real-time analytics, and user-friendly dashboards that empower you to make data-driven decisions with confidence.",
  };

const layout = async({
    children, 
  }: {
    children: React.ReactNode
  }) => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const projectsReq = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+'api/getProjects',{
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({userId: user?.id})
    });

    const {projects} = await projectsReq.json();

    return (
        <main className="min-h-[88vh] mt-8 children rounded-b-xl shadow-2xl children">
          {projects[0].project_id}
          {projects[0].project_id}
          <Dashbar/>
          {children}
        </main>
        
    )
  }

export default layout;
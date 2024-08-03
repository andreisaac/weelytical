import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import DashBar from "./DashBar";
import MainCharts from "./MainCharts";
import {createClient} from "@utils/supabase/server";
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Project analytics, traffic charts and events."
};




const Dashboard = async({ params }: { params: { projectId: string, period: string } }) => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  

  return (
    <main className="min-h-[88vh] pt-8 children rounded-b-xl shadow-2xl">
      <DashBar></DashBar>
      <MainCharts></MainCharts>
    </main>
  );
}

export default Dashboard;
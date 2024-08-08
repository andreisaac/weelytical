"use client"
import {useState} from "react";
import { useParams } from 'next/navigation'

import Image from "next/image";
import Link from "next/link";
import open from "@images/open.svg"
import online from "@images/online.svg"
import LineChart from "@components/chart/lineChart"
import Chart from "@components/ui/Chart"


const chartVisitors = {
  label: 'Visitors',
  labels: ['26/06', '27/06', '28/06', "29/06", "30/06", "01/07", "02/07"],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
      {
        data: [29, 25, 37, 55, 57, 45, 67],
        // you can set indiviual colors for each bar
        backgroundColor: "#F0DAC5",
        borderColor: "#FFAA5A",
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "rgba(84, 55, 99, .7)",
        pointBorderWidth: 0,
        pointRadius: 0,
      }
  ]
};

const chartViews = {
  label: 'Page Views',
  labels: ['26/06', '27/06', '28/06', "29/06", "30/06", "01/07", "02/07"],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
      {
        data: [29, 25, 37, 55, 57, 45, 67],
        // you can set indiviual colors for each bar
        backgroundColor: "#F0DAC5",
        borderColor: "#FFAA5A",
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "rgba(84, 55, 99, .7)",
        pointBorderWidth: 0,
        pointRadius: 0,
      }
  ]
};

const pageViews = {
  label: "Page Views",
  labelRight: "Visitors",
  data: [
    {label: "/homepage", value: "12"},
    {label: "/signin", value: "9"},
    {label: "/register", value: "4"}
  ]
};

const referrers = {
  label: "Referrers",
  data: [
    {label: "google.com", value: "12"},
    {label: "upwork.com", value: "9"},
    {label: "instagram.com", value: "4"}
  ]
};

const countries = {
  label: "Countries",
  data: [
    {label: "Portugal", value: "12"},
    {label: "United States", value: "9"},
    {label: "Italy", value: "8"},
    {label: "France", value: "6"}
  ]
};

const systems = {
  label: "Operating Systems",
  data: [
    {label: "Android", value: "22"},
    {label: "Windows", value: "17"},
    {label: "GNU/Linux", value: "8"}
  ]
};

const browsers = {
  label: "Browsers",
  data: [
    {label: "Chrome", value: "25"},
    {label: "Chrome Mobilo", value: "17"},
    {label: "Safari", value: "8"}
  ]
};

const info = {projectName: "Weezac", projectUrl: "www.weezac.pt", online: "81"}

const apiData = {browsers,systems,countries,referrers,pageViews, chartVisitors, chartViews, info}


const MainCharts = () => {
  const params = useParams<{ projectId: string}>();
  const [chart, setChart] = useState(apiData.chartVisitors);
  
  const {browsers,systems,countries,referrers,pageViews, chartVisitors, chartViews, info} = apiData;

  const switchChart = (c:any) => {
    setChart(c)
  }


  return (
    <main className="bg-n100 border border-n300 rounded-b-xl">
    {params.projectId}
    </main>
  );
}

export default MainCharts;
"use client"
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import open from "@images/open.svg"
import online from "@images/online.svg"
import LineChart from "@components/chart/lineChart"
import Chart from "./Chart"


const data = {
  labels: ['26/06', '27/06', '28/06', "29/06", "30/06", "01/07", "02/07"],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
      {
        label: 'Visitors',
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


const MainCharts = () => {


  return (
    <main className="bg-n100 border border-n300 rounded-b-xl">
      <section className="flex flex-row border-b border-n300">
        <div className="p-4 pl-14 flex flex-1 flex-col">
          <div className="font-jost">
            <h2 className="text-purple900 text-5xl">Project Name</h2>
            <Link href="www.weezac.pt" className="text-n900 text-2xl h3">
              www.projecturl.com 
              <Image src={open} width={20} alt="open" className="h-auto inline ml-2 mb-1"/>
            </Link>
            <span className="border-l-2 border-n500 ml-2 pl-2 inline select-none">
              <Image src={online} width={15} alt="online" className="h-auto inline mr-2 mb-1"/>
              81 Online
            </span>
          </div>
          
          
        </div>
        <div className="flex flex-row-reverse items-stretch">
          <div className={`${(false ? "border-b-4 bg-n200 text-purple900" : "text-n700")} active:bg-orange-100 hover:border-b-4 flex flex-col pt-8 px-8 font-jost border-purple500 cursor-pointer`}>
            <p className="flex place-self-end font-medium">Page Views</p>
            <div className="flex items-center">
              <h1 className="inline text-4xl">190</h1>
              <div className="inline ml-2 py-1 px-2 text-center rounded-lg bg-green-200 bg-opacity-70 border border-green-600 text-green-700 !text-sm">
                <span>+20%</span>
              </div>
            </div>   
          </div>
          <div className={`${(true ? "border-b-4 bg-orange-200 text-purple900" : "text-n700")} active:bg-orange-100 hover:border-b-4 flex flex-col pt-8 px-8 font-jost border-purple500 cursor-pointer`}>
            <p className="flex place-self-end">Visitors</p>
            <div className="flex items-center">
              <h1 className="inline text-4xl">87</h1>
              <div className="inline ml-2 py-1 px-2 text-center rounded-lg bg-green-200 bg-opacity-70 border border-green-600 text-green-700 text-sm">
                <span>+40%</span>
              </div>
            </div>   
          </div>
        </div>
      </section>

      <section className="flex flex-col bg-white bg-opacity-50">
        <LineChart chartData={data} classN={"w-full h-[400px] px-4 my-8" }></LineChart>
      </section>
      
      <section className="flex flex-row bg-white bg-opacity-50">

          <Chart dat={pageViews}/>
          <Chart dat={referrers}/>

      </section>

      <section className="flex flex-row bg-white bg-opacity-50">

          <Chart dat={countries}/>
          <Chart dat={systems}/>
          <Chart dat={browsers}/>

      </section>

      <section className="flex flex-row bg-white bg-opacity-50">

          <Chart dat={pageViews}/>
          <Chart dat={referrers}/>

      </section>
      
    </main>
  );
}

export default MainCharts;
"use client"
import * as React from "react";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import layout from "@images/layout.svg";
import PeriodButton from "@components/ui/PeriodButton";
import OptionsButton from "@components/ui/OptionsButton";

type data = {
  label: string;
  data: object[];
}

const Chart:React.FC<data> = ({label, data}) => {


  return (
    <div className="m-4 flex flex-col rounded-lg flex-1 border-2 border-n200 bg-white bg-opacity-50 shadow-md">

      <div className="p-6 flex flex-row border-b-2 border-n200 bg-n100 font-jost font-bold text-lg text-purple900 rounded-t-lg">
        <span className="flex-1">Referrers</span>
        <span className="flex-1 text-right">Visitors</span>
      </div>

      <div className="flex flex-col min-h-[200px] p-1">
        <div className="flex flex-row m-1 bg-purple300 hover:bg-n100 bg-opacity-15 px-4 py-2 rounded-lg text-n700 font-jost cursor-pointer">
          <p className="flex-1">/Homepage</p>
          <p className="flex-1 text-right">3</p>
        </div>
        <div className="flex flex-row m-1 bg-purple300 hover:bg-n100 bg-opacity-15 px-4 py-2 rounded-lg text-n700 font-jost cursor-pointer">
          <p className="flex-1">/SignIn</p>
          <p className="flex-1 text-right">12</p>
        </div>
        <div className="flex flex-row m-1 bg-purple300 hover:bg-n100 bg-opacity-15 px-4 py-2 rounded-lg text-n700 font-jost cursor-pointer">
          <p className="flex-1">/Register</p>
          <p className="flex-1 text-right">6</p>
        </div>
      </div>

    </div>
  );
}

export default Chart;
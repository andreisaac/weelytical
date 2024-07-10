"use client"
import * as React from "react";
import {useState, useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import arrowDown from "@images/arrow-down.svg"
import calendar from "@images/calendar.svg";

type dropType= {
  onClick: (event: React.MouseEvent) => void;
  toggle: string|boolean;
  animation: string|boolean;
}

const PeriodInput: React.FC<dropType> = ({onClick, toggle, animation}) => {

  return (
    <div className="dropdown dropdown-open" onClick={onClick}>
      <div className={`my-3 mx-2 !px-4 btn-dash !rounded-md `}>
        <Image src={calendar} width={24} alt="layout" loading="lazy" className="h-auto pb-1"/>
        Last 7 Days
        <Image src={arrowDown} width={22} alt="layout" loading="lazy" className="h-auto"/>
      </div>

      <ul className={`!duration-200 transition-all ease-in-out dropdown-content menu bg-n100 border border-n300 top-[54px] left-4 rounded-md z-[1] w-40 p-2 shadow ${(toggle ? "visible" : "hidden")} ${(animation ? "!opacity-100" : "!opacity-0")}`}>
        <li><Link href="dashboard?period=24h" className="hover:bg-neutral-200 active:!bg-n900">Last 24h</Link></li>
        <li><Link href="dashboard" className="hover:bg-neutral-200 active:!bg-n900">Last 7 days</Link></li>
        <li><Link href="dashboard?period=30d" className="hover:bg-neutral-200 active:!bg-n900">Last 30 days</Link></li>
      </ul>

      
    </div>
  )
}


export default PeriodInput;

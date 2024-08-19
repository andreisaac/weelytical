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
      <div tabIndex={0} className="xs:text-2xl my-3 md:mx-2 max-md:!px-3 max-md:!h-9 max-md:!max-h-9 max-md:!btn-xs btn-dash md:text-3xl !font-black">
        <span className="mt-[-12x] md:mt-[-15px]">...</span>
      </div>

      <ul tabIndex={0} className={`!duration-200 transition-all ease-in-out dropdown-content menu bg-n100 border border-n300 top-[54px] right-2 rounded-md z-[1] w-40 p-2 shadow ${(toggle ? "visible" : "hidden")} ${(animation ? "!opacity-100" : "!opacity-0")}`}>
        <li><Link href="upgrade" className="hover:bg-neutral-200 active:!bg-n900">Upgrade to Pro</Link></li>
        <li><Link href="docs" className="hover:bg-neutral-200 active:!bg-n900">Go to Docs</Link></li>
        <li><Link href="dashboard?disable=true" className="hover:bg-neutral-200 active:!bg-n900">Disable Weelytical</Link></li>
      </ul>

      
    </div>
  )
}


export default PeriodInput;

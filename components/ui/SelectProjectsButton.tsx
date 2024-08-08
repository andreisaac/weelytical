"use client"
import * as React from "react";
import {useState, useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import arrowDown from "@images/arrow-down.svg"
import layout from "@images/layout.svg";

interface project {
  id: number,
  project_id: string,
  name: string,
  domain: string,
  members: string[],
  owner: string,
  type: string,
  valid: boolean
}

type dropType= {
  onClick: (event: React.MouseEvent) => void;
  toggle: string|boolean;
  animation: string|boolean;
  projects: project[];
  currentProject: project
}

const PeriodInput: React.FC<dropType> = ({onClick, toggle, animation, currentProject, projects}) => {

  return (
    <div className="dropdown dropdown-open" onClick={onClick}>
      <div className={`my-3 mx-2 !px-4 btn-dash !rounded-md `}>
        <Image src={layout} width={24} alt="layout" loading="lazy" className="h-auto pb-1"/>
        {currentProject?.name}
        <Image src={arrowDown} width={22} alt="layout" loading="lazy" className="h-auto"/>
      </div>

      <ul className={`!duration-200 transition-all ease-in-out dropdown-content menu bg-n100 border border-n300 top-[54px] min-w-[92%] w-fit left-2 rounded-md z-[1] p-2 shadow ${(toggle ? "visible" : "hidden")} ${(animation ? "!opacity-100" : "!opacity-0")}`}>
        {projects.map((item, index)=>
          <li key={item.project_id}><Link href={"/dashboard/"+item.project_id} className="hover:bg-orange-200 active:!bg-n900">{item.name}</Link></li>
        )}
      </ul>

      
    </div>
  )
}


export default PeriodInput;

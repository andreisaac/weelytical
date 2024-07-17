"use client"
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import layout from "@images/layout.svg";
import PeriodButton from "@components/ui/PeriodButton";
import OptionsButton from "@components/ui/OptionsButton";



const DashBar = () => {
  const [toggle, setToggle] = useState({options: false, period: false});
  const [animation, setAnimation] = useState({options: false, period: false});

  const onClick = (type: string) => {
    const obj = {options: type === "options" ? !toggle.options : false, period: type === "period" ? !toggle.period : false}

    if(toggle.options || toggle.period) {
      setTimeout(() => (
        setAnimation(obj)
      ), 210);
        setToggle(obj);
        
    } else {
      setToggle(obj);
      setTimeout(() => (
        setAnimation(obj)
      ), 10);
    }

  };

  return (
    <section className=" max-md:flex-col px-4 flex flex-row bg-n700 border border-n300 rounded-t-lg">
    <div className="max-md:mx-auto flex flex-1 flex-row">
      <a className="my-3 mx-2 !px-8 btn-dash !rounded-full bg-white">
        <Image src={layout} width={24} alt="layout" loading="lazy" className="h-auto pb-1"/>
        Overview
      </a>
    </div>
    <div className="max-md:mx-auto flex flex-row-reverse">
      <OptionsButton onClick={()=>onClick("options")} toggle={toggle?.options} animation={animation?.options}></OptionsButton>
      <PeriodButton onClick={()=>onClick("period")} toggle={toggle?.period} animation={animation?.period}></PeriodButton>
    </div>
  </section>
  );
}

export default DashBar;
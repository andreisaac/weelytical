"use client"
import * as React from "react";
import {useState, useRef} from "react";
import {useSearchParams} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import x from "@images/x.svg";
import upDown from "@images/upDown.svg";
import expand from "@images/expand.svg";
import PeriodButton from "@components/ui/PeriodButton";
import OptionsButton from "@components/ui/OptionsButton";

interface dial extends HTMLDialogElement {
  showModal(): void;
  close(returnValue?: string): void;
}

interface dataL {
  label: string; 
  value: string
};

type d = {
  dat: {
    label: string;
    labelRight?: string;
    data: dataL[]
  };
}

const Chart:React.FC<d> = ({dat}) => {
  const [ordenate, setOrdenate] = useState(false);
  const dialogRef = useRef<dial>(null);
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter")
  const {label, labelRight, data} = dat;

  const ordenateClick = () => {
    setOrdenate(!ordenate)
    data.reverse() 
  }

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const close = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div className="m-4 flex flex-col rounded-xl flex-1 bg-white bg-opacity-50 shadow-md">

      <div className="h-20 px-8 flex flex-row bg-n700 text-n100 font-bold text-lg rounded-t-lg">
        <span className="flex flex-col self-center flex-none">
          <a className="mt-1 px-4 py-1 hover:text-orange900 rounded-lg transition ease-in-out active:scale-95 cursor-pointer" onClick={ordenateClick}><Image src={upDown} width={14} alt="reorder" className="border-n900 inline h-auto"/>  {label}</a>
          {label.toLowerCase() === filter ? 
            <Link href="dashboard" className="mb-1 ml-4 w-[94px] py-2 font-fira text-xs text-n800 border bg-n100 hover:bg-orange300 font-medium text-center rounded-lg transition ease-in-out active:scale-95">
              Clear filter <Image src={x} width={14} alt="close" className="border-n900 inline h-auto pb-[1px]"/>  
            </Link>
          : ""}
          </span>
        <span className="flex-1 text-right self-center select-none">{labelRight ? labelRight : "Visitors"}</span>
      </div>

      <div className="flex flex-col min-h-[200px] p-1 border border-n300 rounded-b-xl h-full">
        { data.map((item, index)=>
            (
              <Link href={`dashboard?filter=${label.toLowerCase()}&value=${item.label}`} key={index} className="flex flex-row m-1 bg-n100 hover:bg-orange300 px-4 py-2 rounded-lg text-n700 font-jost cursor-pointer transition ease-in-out active:scale-95">
                <p className="flex-1">{item.label}</p>
                <p className="flex-1 text-right">{item.value}</p>
              </Link>
            )
        )}

        <a onClick={openDialog} className="btn min-h-8 h-8 w-22 mx-auto bg-n100 hover:bg-orange300 border border-n300 mt-6 mb-2">View all<Image src={expand} width={18} alt="expand" className="border-n900 inline h-auto"/>  </a>
      </div>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box p-0 !w-full">

          <a onClick={close} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-n100 hover:bg-n600">✕</a>
          
          <div className="h-[84px] flex flex-row bg-n800 font-bold text-lg text-n100 rounded-t-lg">
            <span className="ml-2 pb-3 flex flex-col self-end flex-none">
              <a className="mt-1 px-2 py-1 hover:text-orange900 rounded-lg transition ease-in-out active:scale-95 cursor-pointer" onClick={ordenateClick}><Image src={upDown} width={14} alt="reorder" className="border-n900 inline h-auto"/>  {label}</a>
            </span>
            <span className="mr-8 pb-3 flex-1 text-right self-end select-none">{labelRight ? labelRight : "Visitors"}</span>
          </div>

          <div className="flex flex-col min-h-[200px] p-4">
            { data.map((item, index)=>
                (
                  <Link href={`dashboard?filter=${label.toLowerCase()}&value=${item.label}`} key={index} className="px-8 py-2 flex flex-row m-1 bg-n100 hover:bg-orange-200 rounded-lg text-n700 font-jost cursor-pointer transition ease-in-out active:scale-95">
                    <p className="flex-1">{item.label}</p>
                    <p className="flex-1 text-right">{item.value}</p>
                  </Link>
                )
            )}

          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div>
  );
}

export default Chart;
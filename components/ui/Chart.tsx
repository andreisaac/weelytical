"use client"
import * as React from "react";
import {useState, useRef} from "react";
import {useSearchParams} from "next/navigation";
import Image from "next/image";
import {getFavicon} from '@utils/dataParse';
import expand from "@images/expand.svg";

interface dial extends HTMLDialogElement {
  showModal(): void;
  close(returnValue?: string): void;
}

type d = {
    label: string,
    leftLabel: string,
    data: { referrer?: boolean, flag?: string, label: string , total: number}[]
}

const Chart:React.FC<d> = ({data, label, leftLabel}) => {
  const [ordenate, setOrdenate] = useState(false);
  const dialogRef = useRef<dial>(null);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  
  const ordenateClick = () => {
    setOrdenate(!ordenate)
    //data.reverse() 
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
    <div className="flex flex-col rounded-xl flex-1 bg-white bg-opacity-50 shadow-md">

      <div className="h-20 px-8 flex flex-row bg-n700 text-n100 text-lg rounded-t-lg">
        <span className="flex flex-col self-center flex-none select-none"> {label} </span>
        <span className="flex-1 text-right self-center select-none">{leftLabel}</span>
      </div>

      <div className="flex flex-col min-h-[200px] overflow-y-none p-1 border border-n300 rounded-b-xl h-full">
        {
            data.slice(0,8).map((item, index)=>
              item.label.length > 0 ? 
              <div key={index} className="flex flex-row m-1 bg-n100 hover:bg-orange300 px-4 py-2 rounded-lg text-n700 font-jost cursor-pointer transition ease-in-out">
                {item.flag?
                   <Image src={item.flag} alt={`Image ${item.label}`} width={30} height={15} className="h-auto rounded-md mr-4" /> 
                : "" }
                {item.referrer ?
                  <img src={getFavicon(item.label)||""} alt={``} className="h-auto w-4 md:w-6 -mt-1 mr-4 object-contain" /> 
                : null }
                <p className="flex-1 break-all mr-2">{item.label}</p>
                <p className="text-right">{item.total}</p>
              </div>
              : ""
            )
          }
      
        <a onClick={openDialog} className="btn min-h-8 h-8 w-22 mx-auto bg-n100 hover:bg-orange300 border border-n300 mt-6 mb-2 place-self-end">View all<Image src={expand} width={18} alt="expand" className="border-n900 inline h-auto"/>  </a>
      </div>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box p-0 min-w-[700px] w-[700px]">

          <a onClick={close} className="pt-1 btn btn-sm btn-circle btn-ghost absolute right-2 top-2 !text-n100 hover:bg-n600">✕</a>
          
          <div className="h-[84px] flex flex-row bg-n800 font-bold text-lg text-n100 rounded-t-lg">
            
            <span className="ml-8 pb-3 flex flex-col self-end flex-none select-none"> {label} </span>
            <span className="mr-8 pb-3 flex-1 text-right self-end select-none">{leftLabel}</span>
          </div>

          <div className="flex flex-col min-h-[200px] p-4 overflow-y-auto">

          {
            data.map((item, index)=>
              item.label.length > 0 ? 
              <div key={index} className="flex flex-row m-1 bg-n100 hover:bg-orange300 px-4 py-2 rounded-lg text-n700 font-jost cursor-pointer transition ease-in-out">
                {item.flag?
                   <Image src={item.flag} alt={`Image ${item.label}`} width={30} height={15} className="h-auto rounded-md mr-4" /> 
                : null }
                {item.referrer ?
                  <img src={getFavicon(item.label)||""} alt={``} className="h-auto w-4 md:w-6 p-1 mr-4 object-contain" /> 
                : null }
                <p className="flex-1 break-all mr-2">{item.label}</p>
                <p className="text-right">{item.total}</p>
              </div>
              : null 
            )
          }

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
"use client"
import * as React from "react";
import {useState} from "react";
import Image from "next/image";
import errorSVG from "@images/error.svg";
import checkSVG from "@images/check.svg";


type emailType = {
  value: string;
  text: string;
  name: string;
  label?: string;
  inputUpdate: Function;
  checked?: boolean;
};

const RadioButtonInput: React.FC<emailType> = ({ value, text , name, label, inputUpdate, checked }) => {
  const [errorState, setErrorState] = useState(false);
  const [animation, setAnimation] = useState(false);

  const handleInput = (event:React.FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    inputUpdate(val);
  }


  return (
    <div className={`form-control pb-3 pt-4 px-8 rounded-lg my-2 border border-n200 transition duration-500 ease-in-out ${checked? "bg-n200" : "bg-n100"}`}>
      <label className="label cursor-pointer">
        <span className="label-text"><span className="text-n700 h3">{label}</span><br/><span className="text-n600">{text}</span></span> 
        <input type="radio" name={name} value={value} className="radio shadow-slate-100 checked:bg-orange900 transition duration-500 ease-in-out" checked={checked} onClick={handleInput}/>
      </label>
    </div>
  )
}


export default RadioButtonInput;

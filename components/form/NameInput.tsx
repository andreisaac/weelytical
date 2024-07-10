"use client"
import * as React from "react";
import {useState} from "react";
import Image from "next/image";
import errorSVG from "@images/error.svg";
import checkSVG from "@images/check.svg";

type nameType = {
  value: string;
  error: string;
  name: string;
  placeholder?: string;
  label?: string;
  errorUpdate: Function;
  inputUpdate: Function;
  required?: boolean;
  autoComplete?: string;
};

const EmailInput: React.FC<nameType> = ({ value, error, name, placeholder, label, errorUpdate, inputUpdate, required, autoComplete }) => {
  const [errorState, setErrorState] = useState(false);
  const [animation, setAnimation] = useState(false);

  const handleInput = (event:React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const n = event.currentTarget.name;
    inputUpdate(value);
    const reg = /^.{4,40}$/; 
    if (value.match(reg)) {
      setAnimation(false)
      setTimeout(()=>{setErrorState(false);}, 10)
      errorUpdate(n,"");
    } else {
      setErrorState(true)
      setTimeout(()=>{setAnimation(true);}, 10)
      errorUpdate(n,"Must have between 4 and 40 characters");
    }
  }


  return (
    <div className="form-control">
      {label ? <label className="label">{label}</label> : ""}

        <input type="text" name={name} placeholder={placeholder || "Name"} value={value} onChange={handleInput}  className="input" autoComplete={autoComplete || ""}/>
        
        <div className={`text-red900 mt-2 transition duration-500 ease-in-out ${((value !=="") && (errorState) ? 'opacity-100' : 'opacity-0')} ${((value !=="") && (animation) ? 'opacity-100' : 'opacity-0')}`}>
            <Image src={errorSVG} width={24} height={24} alt="error" className="inline"></Image> {error}
        </div>
  </div>
  )
}


export default EmailInput;

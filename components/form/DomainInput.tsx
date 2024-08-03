"use client"
import * as React from "react";
import {useState} from "react";
import Image from "next/image";
import errorSVG from "@images/error.svg";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

type domainType = {
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

const DomainInput: React.FC<domainType> = ({ value, error, name, placeholder, label, errorUpdate, inputUpdate, required, autoComplete }) => {
  const [errorState, setErrorState] = useState(false);
  const [animation, setAnimation] = useState(false);

  const handleInput = (event:React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const n = event.currentTarget.name;
    inputUpdate(value);
    const reg = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
    if (value.match(reg)) {
      setAnimation(false)
      setTimeout(()=>{setErrorState(false);}, 10)
      errorUpdate(n,"");
    } else {
      setErrorState(true)
      setTimeout(()=>{setAnimation(true);}, 10)
      errorUpdate(n,"Domain required. Ex: weelytical.com, sub.weelytical.com");
    }
  }

  const onBlurCheckDomain = async(event:React.FormEvent<HTMLInputElement>)=>{
    const value = event.currentTarget.value;
    const n = event.currentTarget.name;
    
    
    const domainReq = await fetch("/api/findProjectDomain", {
      method: "POST", 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({domain:value})
    });

    const {projectDomain, msg} = await domainReq.json()
    

    if(projectDomain) {
      setErrorState(true)
      setTimeout(()=>{setAnimation(true);}, 10)
      errorUpdate(n,"Domain already in use, if your domain was taken contact us by the following email \n main@weelytical.com");
    } else {
      console.log(msg);
    }
  }


  return (
    <div className="form-control">
      {label ? <label className="label">{label}</label> : ""}

        <input type="text" name={name} placeholder={placeholder || "Name"} value={value} onChange={handleInput} onBlur={onBlurCheckDomain}  className="input" autoComplete={autoComplete || ""}/>
        
        <div className={`text-red900 mt-2 transition duration-500 ease-in-out ${((value !=="") && (errorState) ? 'visible' : 'hidden')} ${((value !=="") && (animation) ? 'opacity-100' : 'opacity-0')}`}>
            <Image src={errorSVG} width={24} height={24} alt="error" className="inline"></Image> {error}
        </div>
  </div>
  )
}


export default DomainInput;

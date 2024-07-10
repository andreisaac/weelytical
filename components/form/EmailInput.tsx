"use client"
import * as React from "react";
import {useState} from "react";
import Image from "next/image";
import errorSVG from "@images/error.svg";

type emailType = {
  value: string;
  error: any;
  name: string;
  placeholder?: string;
  label?: string;
  errorUpdate: Function;
  inputUpdate: Function;
  required?: boolean;
};

const EmailInput: React.FC<emailType> = ({ value, error, name, placeholder, label, errorUpdate, inputUpdate, required }) => {
  const [errorState, setErrorState] = useState(false);
  const [animation, setAnimation] = useState(false);

  const handleInput = (event:React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const n = event.currentTarget.name;
    inputUpdate(value);
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value.match(reg)) {
      setAnimation(false)
      setTimeout(()=>{setErrorState(false);}, 10)
      errorUpdate(n, "")
    } else {
      setErrorState(true)
      setTimeout(()=>{setAnimation(true);}, 10)
      errorUpdate(n, "Example: patuscos@mail.com");
    }
  }


  return (
    <div className="form-control">
      {label ? <label className="label">{label}</label> : ""}

        <input type="email" id="email" name={name} placeholder={placeholder || "email@email.com"} value={value} onChange={handleInput}  className="input" autoComplete="username"/>
        
        <div className={`text-red900 mt-2 transition duration-500 ease-in-out ${((value !=="") && (errorState) ? 'opacity-100' : 'opacity-0')} ${((value !=="") && (animation) ? 'opacity-100' : 'opacity-0')}`}>
            <Image src={errorSVG} width={24} height={24} alt="error" className="inline"></Image> Example: somename@provider.com
        </div>
  </div>
  )
}


export default EmailInput;

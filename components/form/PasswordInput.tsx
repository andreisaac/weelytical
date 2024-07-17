"use client"
import * as React from "react";
import {useState} from "react";
import Image from "next/image";
import errorSVG from "@images/error.svg";
import checkSVG from "@images/checkCircle.svg";
import eyeFill from "@images/eyeFill.svg";
import eye from "@images/eye.svg";



type passwordType =  {
  value: string;
  error: any;
  name: string;
  placeholder?: string;
  label?: string;
  errorUpdate: Function;
  inputUpdate: Function;
  required?: boolean;
};

const PasswordInput: React.FC<passwordType> = ({ value, error, name, placeholder, label, errorUpdate, inputUpdate }) => {
  const [errorState, setErrorState] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [visible, setVisible] = useState(false);

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  });

  const validatePassword = (password:string) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setValidations({
      length,
      uppercase,
      lowercase,
      specialChar
    });
    if(!length || !uppercase || !lowercase || !specialChar) {
      return true
    } else {
      return false
    }
  };

  const handleInput = (event:React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const n = event.currentTarget.name;
    errorUpdate(n, validations);
    inputUpdate(value);
  }



  return (
    <div className="form-control relative">
      {label ? <label className="label">{label}</label> : ""}

      <input type={visible ? "text" : "password"} id="password" name={name} value={value} placeholder="Password" onChange={handleInput} className="input" autoComplete="password"/>
      <label className="swap swap-rotate absolute right-4 top-[52px]">
        <input type="checkbox" onClick={()=>setVisible(!visible)}/>
        <Image src={eyeFill} width={24} alt="password visible" loading="lazy" className="h-auto opacity-70 hover:opacity-90 swap-on"/>
        <Image src={eye} width={24} alt="password visible" loading="lazy" className="h-auto opacity-70 hover:opacity-90 swap-off"/>
      </label>  
      
        <div className={` mt-2 transition duration-500 ease-in-out ${( errorState ? '' : ' hidden')} ${( animation ? 'opacity-100' : 'opacity-0')}`}>
            <p className={`  ${(validations.lowercase ? 'text-green900' : 'text-red900')}`}><Image src={validations.lowercase ? checkSVG : errorSVG} width={24} height={24} alt="error" className="inline" loading="lazy"></Image> At least one lowercase letter</p>
            <p className={`  ${(validations.uppercase ? 'text-green900' : 'text-red900')}`}><Image src={validations.uppercase ? checkSVG : errorSVG} width={24} height={24} alt="error" className="inline" loading="lazy"></Image> At least one uppercase letter</p>
            <p className={`  ${(validations.specialChar ? 'text-green900' : 'text-red900')}`}><Image src={validations.specialChar ? checkSVG : errorSVG} width={24} height={24} alt="error" className="inline" loading="lazy"></Image> At least one special character</p>
            <p className={`  ${(validations.length ? 'text-green900' : 'text-red900')}`}><Image src={validations.length ? checkSVG : errorSVG} width={24} height={24} alt="error" className="inline" loading="lazy"></Image> At least 8 characters</p>
        </div> 


  </div>
  )
}


export default PasswordInput;


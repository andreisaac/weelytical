"use client"
import * as React from "react";
import {useState} from "react";
import Image from "next/image";
import errorSVG from "@images/error.svg";
import checkSVG from "@images/check.svg";



type passwordType =  {
  password: string;
  error: any;
  name: string;
  placeholder?: string;
  label?: string;
  errorUpdate: Function;
  inputUpdate: Function;
  required?: boolean;
};

const SetPasswordInput: React.FC<passwordType> = ({ password, error, name, placeholder, label, errorUpdate, inputUpdate }) => {
  const [errorState, setErrorState] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: true
  });

  const validatePassword = (val:string, confirmPass:string) => {
    const length = val.length >= 8;
    const uppercase = /[A-Z]/.test(val);
    const lowercase = /[a-z]/.test(val);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);
    const match = (val === confirmPass);
  
    
    setValidations({
      length,
      uppercase,
      lowercase,
      specialChar,
      match
    });

    errorUpdate(name, {
      match,
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
    const val = event.currentTarget.value;
    const n = event.currentTarget.name;
    inputUpdate(val);
    validatePassword(val, confirmPassword);
    
    if(val === "") {
      setAnimation(false)
      setTimeout(()=>{
        setErrorState(false);}, 300);
    } else {
      if(validatePassword(val, confirmPassword)){
        setErrorState(true);
        setTimeout(()=>{
          setAnimation(true)}, 10);
      } else {
        setAnimation(false);
        setTimeout(()=>{
          setErrorState(false)}, 300);
      }
    }
  }

  const handleConfirm = async (event:React.FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    const n = event.currentTarget.name;
    setConfirmPassword(val);
    validatePassword(password, val);
  }



  return (
    <div className="form-control">
      {label ? <label className="label">{label}</label> : ""}
      <input type="password" name={name} value={password} placeholder="Password" onChange={handleInput} className="input" autoComplete="password"/>
        
      <div className={` mt-2 transition duration-500 ease-in-out ${( errorState ? '' : ' hidden')} ${( animation ? 'opacity-100' : 'opacity-0')}`}>
          <p className={` transition-colors duration-500 ease-in-out  ${(validations.lowercase ? 'text-green900' : 'text-red900')}`}><Image src={validations.lowercase ? checkSVG : errorSVG} width={24} alt="error" className="h-auto inline pb-1"></Image> At least one lowercase letter</p>
          <p className={` transition-colors duration-500 ease-in-out  ${(validations.uppercase ? 'text-green900' : 'text-red900')}`}><Image src={validations.uppercase ? checkSVG : errorSVG} width={24} alt="error" className="h-auto inline pb-1"></Image> At least one uppercase letter</p>
          <p className={` transition-colors duration-500 ease-in-out  ${(validations.specialChar ? 'text-green900' : 'text-red900')}`}><Image src={validations.specialChar ? checkSVG : errorSVG} width={24} alt="error" className="h-auto inline pb-1"></Image> At least one special character</p>
          <p className={` transition-colors duration-500 ease-in-out  ${(validations.length ? 'text-green900' : 'text-red900')}`}><Image src={validations.length ? checkSVG : errorSVG} width={24} alt="error" className="h-auto inline pb-1"></Image> At least 8 characters</p>
      </div> 

      <label className="label">Confirm password:</label>
      <input type="password" name={"confirmPassword"} value={confirmPassword} placeholder="Confirm password" onChange={handleConfirm} className="input" autoComplete="password"/>
      <div className={` mt-2 transition duration-500 ease-in-out ${( confirmPassword.length > 0 ? '' : ' hidden')} `}>
        <p className={` transition-colors duration-500 ease-in-out  ${(password === confirmPassword ? 'text-green900' : 'text-red900')}`}><Image src={validations.match ? checkSVG : errorSVG} width={24} alt="error" className="h-auto inline pb-1"></Image> {validations.match ? "Passwords match" : "Passwords do not match"}</p>
      </div>

  </div>
  )
}


export default SetPasswordInput;


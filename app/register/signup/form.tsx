"use client"
import * as React from "react";
import {useState, useEffect} from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import {motion} from "framer-motion";
import NameInput from "@components/form/NameInput";
import EmailInput from "@components/form/EmailInput";
import SetPasswordInput from "@components/form/SetPasswordInput";
import googleLogo from "@images/googleLogo.svg";
import githubLogo from "@images/githubLogo.svg";
import {createClient} from "@utils/supabase/client";
import { useUserContext } from '../../../app/context/userContext';

type signUpType = {
  cUser?: any;
}

const Form: React.FC<signUpType> = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitErr, setSubmitErr] = useState("");
  const [displayName, setDisplayName] = useState("");
  const {user, dispatch} = useUserContext();
  
  const [err, setErr] = useState({displayName: "", email: "", password: {
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: true
  }});
  

  const supabase = createClient();
  
  useEffect(()=>{
    const asyncFunction = async() => {
      const { data: { user } } = await supabase.auth.getUser();
      if(user) {
        router.push("/register/project");
      }
    };
    asyncFunction();
  })

  //function to update component errors
  const errUpdate = (n:string, v:any) => {
    setErr({...err, [n] : v})
  }


  const providerAuth = async(provider:any) => {
      const signUp = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: process.env.NEXT_PUBLIC_LOCAL_API_URL+"register/project"
        }
      });
  }

  const submit = async () => {
    if((email && !err.email) && (password && Object.values(err.password).every(Boolean))) { 

      const reqU = await fetch("/api/user/signup", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email, password, displayName})
      });

      const {success, error} = await reqU.json();
      console.log(success);
      console.log(error);
      
      if(success) {
        router.push("/register/confirm");
      } else {
        setSubmitErr("Error on signUp.");
        setTimeout(()=>{
          setSubmitErr("")
        }, 3000)
      }

      setSubmitErr("");

    } else {

      setSubmitErr("Email and password required.");
      setTimeout(()=>{
        setSubmitErr("")
      }, 3000)

    }
  };



  return (


    <motion.main key={"step2"} initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} transition={{duration: .1, ease:"easeInOut"}} className="max-md:px-4 md:w-[600px] mx-auto">

      <h2 className="text-center">Pick a Sign Up option</h2>
      <div className="flex flex-col mt-8 w-full">

        <a onClick={()=>providerAuth("google")} className="p-3 mt-2 block text-center h3 text-n700 rounded-lg bg-n100 border border-n200 cursor-pointer hover:scale-105 transition ease-out hover:ease-in active:scale-100"><Image src={googleLogo} width={30} alt="google logo" className="inline mr-4 h-auto"></Image> Sign Up with Google</a>
        <a onClick={()=>providerAuth("github")} className="p-3 my-8 block text-center h3 text-n100 rounded-lg bg-n800 border border-n200 cursor-pointer hover:scale-105 transition ease-out hover:ease-in active:scale-100"><Image src={githubLogo} width={40} alt="github logo" className="inline mr-4val"></Image> Sign Up with GitHub</a>
        
        <div className="divider text-xl text-n700">OR</div>

        <NameInput name="displayName" placeholder="Your name" value={displayName} error={err.displayName} label="Display Name:" inputUpdate={setDisplayName} errorUpdate={errUpdate} required={true} autoComplete="displayName"/>
        <EmailInput name="email" value={email} error={err.email} label="Email:" inputUpdate={setEmail} errorUpdate={errUpdate} required={true}/>
        <SetPasswordInput name="password" password={password} error={err.password} label="Password:" inputUpdate={setPassword} errorUpdate={errUpdate} required={true}/>

        <a className="btn btn-primary btn-block mt-10" onClick={submit}>Continue</a>
        {submitErr ? (<div role="alert" className="alert alert-err mt-4 rounded-lg bg-red500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error! {submitErr}</span>
        </div>) : ""}


      </div>
    </motion.main>

  );

  

  
}

export default Form;
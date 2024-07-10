"use client"
import * as React from "react";
import {useState, useEffect} from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import NameInput from "@components/form/NameInput";
import EmailInput from "@components/form/EmailInput";
import SetPasswordInput from "@components/form/SetPasswordInput";
import RadioButtonInput from "@components/form/RadioButtonInput";
import arrowleft from "@images/arrowleft.svg";
import googleLogo from "@images/googleLogo.svg";
import githubLogo from "@images/githubLogo.svg";


type firstForm = {
  cType?: string | undefined;
  cProjectName?: string | undefined;
  cEmail?: string | undefined;
  cPassword?: string | undefined;
  cVerification?: string | undefined;
}

const Form: React.FC<firstForm> = ({cType, cProjectName, cEmail, cPassword, cVerification}) => {
  const router = useRouter();
  const [verification, setVerification] = useState("");
  const [email, setEmail] = useState(cEmail || "");
  const [password, setPassword] = useState(cPassword || "");
  const [projectName, setProjectName] = useState(cProjectName || "");
  const [type, setType] = useState(cType || "hobby");
  const [submitErr, setSubmitErr] = useState({step1: false, step2: false, step3: false});
  const [error, setError] = useState({projectName: "", email: "", verification: "", password: {
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: true
  }});

  const back = async (t:string) => {
    if(t === "1st") {
      const req = await fetch("/register/api", {
        method: "DELETE", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({type: true, projectName: true})
      });
      router.refresh();
    }
    if(t === "2st") {
      const req = await fetch("/register/api", {
        method: "DELETE", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email: true})
      });
      router.refresh();
    }
  }

  const errorUpdate = (n:string, v:any) => {
    setError({...error, [n] : v})
  }
  const submitStep1 = async () => {

    if(projectName.length > 3) {
      const req = await fetch("/register/api", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({type, projectName})
      });

      router.refresh();
      setSubmitErr({...submitErr,step1:false});

    } else {

      setSubmitErr({...submitErr,step1:true});
      setTimeout(()=>{
        setSubmitErr({...submitErr,step1:false})
      }, 3000)

    }
  };

  const submitStep2 = async () => {
    if((email && !error.email) && (password && Object.values(error.password).every(Boolean))) { 

      const req = await fetch("/register/api", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email, password})
      });

      router.refresh();
      setSubmitErr({...submitErr,step2:false});

    } else {

      setSubmitErr({...submitErr,step2:true});
      setTimeout(()=>{
        setSubmitErr({...submitErr,step2:false})
      }, 3000)

    }
  };

  const submitStep3 = async () => {
    console.log(cVerification);
    
    if(verification === cVerification) { 
      const req = await fetch("/register/api", {
        method: "DELETE", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({clean: true})
      });

      router.push("/dashboard");

    } else {
      setSubmitErr({...submitErr,step3:true});
      setTimeout(()=>{
        setSubmitErr({...submitErr,step3:false})
      }, 3000)

    }
  };


  return (
    <AnimatePresence mode="wait">
    {!cType && !cProjectName ? (
   
    <motion.main key={"step1"} initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} transition={{duration: .3, ease:"easeInOut"}} className="w-[600px] mx-auto">
      <h2 className="text-n700 text-center mt-14">Create your Weelytical Account</h2>
      <div className="flex flex-col mt-8 w-full">
        <RadioButtonInput name="hobby" value={"hobby"} label="Hobby" text="I'm working on personal projects" inputUpdate={setType} checked={type === "hobby"}/>
        <RadioButtonInput name="pro" value={"pro"} label="Pro" text="Commercial projects" inputUpdate={setType} checked={type === "pro"}/>
        <NameInput name="projectName" value={projectName} error={error.projectName} label="Project Name:" inputUpdate={setProjectName} errorUpdate={errorUpdate} required={true}/>
        
        <a className="btn btn-primary btn-block mt-10" onClick={submitStep1}>Continue</a>   

        {submitErr.step1 ? (<div role="alert" className="alert alert-error mt-4 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error! Project name required.</span>
        </div>) : ""}

      </div>
    </motion.main>

  ) : !cEmail ?
  (

    <motion.main key={"step2"} initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} transition={{duration: .1, ease:"easeInOut"}} className="w-[600px] mx-auto">
      <a className="btn font-normal border-n300 text-n800 absolute top-1 left-60" onClick={()=>back("1st")}>
        <Image src={arrowleft} width={22} loading="lazy" alt="arrow right" className="inline-block h-auto"></Image>
        Back
      </a>

      <h2 className="text-center">Pick a Sign In option</h2>
      <div className="flex flex-col mt-8 w-full">

        <a className="p-3 mt-2 block text-center h3 text-n700 rounded-lg bg-n100 border border-n200 cursor-pointer hover:scale-105 transition ease-out hover:ease-in active:scale-100"><Image src={googleLogo} width={30} alt="google logo" className="inline mr-4 h-auto"></Image> Sign In with Google</a>
        <a className="p-3 my-8 block text-center h3 text-n100 rounded-lg bg-n800 border border-n200 cursor-pointer hover:scale-105 transition ease-out hover:ease-in active:scale-100"><Image src={githubLogo} width={40} alt="google logo" className="inline mr-4val"></Image> Sign In with GitHub</a>
        
       <h3 className="text-center border-t-2 border-purple300 relative my-8"><span className="bg-white absolute top-[-16px] left-[50%] ml-[-60px] px-10">or</span></h3>

        <EmailInput name="email" value={email} error={error.email} label="Email:" inputUpdate={setEmail} errorUpdate={errorUpdate} required={true}/>
        <SetPasswordInput name="password" password={password} error={error.password} label="Password:" inputUpdate={setPassword} errorUpdate={errorUpdate} required={true}/>

        <a className="btn btn-primary btn-block mt-10" onClick={submitStep2}>Continue</a>
        {submitErr.step2 ? (<div role="alert" className="alert alert-error mt-4 rounded-lg bg-red500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error! Email and password required.</span>
        </div>) : ""}

      </div>
    </motion.main>

  ) : (

    <motion.main key={"step3"} initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} transition={{duration: .1, ease:"easeInOut"}} className="w-[600px] mx-auto mt-36">

      <h3 className="text-center">Keep this window open and in a new tab open the link we just sent to {cEmail} with security code:</h3>

      <div className="flex flex-col mt-8 w-full">
        
        <NameInput name="verification" value={verification} error={error.verification} label="Verfication code:" placeholder={"Verfication code"} inputUpdate={setVerification} errorUpdate={errorUpdate} required={true}/>

        <a className="btn btn-primary btn-block mt-10" onClick={submitStep3}>Continue</a>

        {submitErr.step2 ? (<div role="alert" className="alert alert-error mt-4 rounded-lg bg-red500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error! Email and password required.</span>
        </div>) : ""}

      </div>
    </motion.main>

  )
  }
 
    </AnimatePresence>
  );

  

  
}

export default Form;
"use client"
import * as React from "react";
import {useState} from "react";
import { useRouter } from 'next/navigation'
import NameInput from "@components/form/NameInput";
import DomainInput from "@components/form/DomainInput";
import RadioButtonInput from "@components/form/RadioButtonInput";

type projectForm = {
  cUser?: any;
  cType?: string | undefined;
  cProjectName?: string | undefined;
  cDisplayName?: string | undefined;
  cDomain?: string | undefined;
}


const Form: React.FC<projectForm> = ({cType, cProjectName, cUser, cDomain}) => {
  const router = useRouter();
  const [domain, setDomain] = useState(cDomain || "");
  
  const [projectName, setProjectName] = useState(cProjectName || "");
  const [type, setType] = useState(cType || "hobby");
  const [submitErr, setSubmitErr] = useState("");
  const [err, setErr] = useState({projectName: "", domain: "", displayName: "",});
  

  //function to update component errors
  const errUpdate = (n:string, v:any) => {
    setErr({...err, [n] : v})
  }
  
  const submit = async () => {
    if(projectName.length > 3 && !err.domain) {
      const req = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+"api/createProject", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({type, projectName, domain: domain.startsWith("www.") ? domain.substring(4) : domain, owner: cUser?.id})
      });

      const {projectDomain} = await req.json();

      if(projectDomain) {
        router.push("/dashboard/?projectId="+projectDomain);
      } else {
        setSubmitErr("Failed to create the project.");
        setTimeout(()=>{
          setSubmitErr("")
        }, 3000)
      }

    } else {

      setSubmitErr("Project name and domain is required.");
      setTimeout(()=>{
        setSubmitErr("")
      }, 3000)

    }
  };



  return (


  <main key={"step1"} className="max-md:px-4 md:w-[600px] mx-auto">
    <h2 className="text-n700 text-center mt-14">Create your Weelytical Project</h2>
    <div className="flex flex-col mt-8 w-full">
      <RadioButtonInput name="hobby" value={"hobby"} label="Hobby" text="I'm working on personal projects" inputUpdate={setType} checked={type === "hobby"}/>
      <RadioButtonInput name="pro" value={"pro"} label="Pro" text="Commercial projects" inputUpdate={setType} checked={type === "pro"}/>
      <NameInput name="projectName" placeholder="Project name" value={projectName} error={err.projectName} label="Project Name:" inputUpdate={setProjectName} errorUpdate={errUpdate} required={true} autoComplete="projectName"/>
      <DomainInput name="domain" placeholder="Domain" value={domain} error={err.domain} label="Domain:" inputUpdate={setDomain} errorUpdate={errUpdate} required={true} autoComplete="domain"/>
      
      <a className="btn btn-primary btn-block mt-10" onClick={submit}>Continue</a>   

      {submitErr ? (<div role="alert" className="alert alert-error mt-4 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error! {submitErr}</span>
      </div>) : ""}

    </div>
  </main>

  );

  

  
}

export default Form;
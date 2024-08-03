"use client"
import * as React from "react";
import {useState} from "react";
import { useRouter } from 'next/navigation'
import EmailInput from "@components/form/EmailInput";
import {createClient} from "@utils/supabase/client";

const Form = () => {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [submitErr, setSubmitErr] = useState("");
  const [err, setErr] = useState({email: ""});
  

  //function to update component errors
  const errUpdate = (n:string, v:any) => {
    setErr({...err, [n] : v})
  }
  
  const resendConfirmationEmail = async() => {
    if(email) {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: 'https://weelytical.com/register/project'
        }
      });
    }
    
  };



  return (


  <main key={"step1"} className="max-md:px-4 md:w-[600px] mx-auto">
    <div className="flex flex-col mt-8 w-full">
      <EmailInput name="email" placeholder="email@domain.com" value={email} error={err.email} label="Email:" inputUpdate={setEmail} errorUpdate={errUpdate} required={true}/>
      
      <a className="btn btn-primary btn-block mt-10" onClick={resendConfirmationEmail }>Resend Confirmation Email</a>   

    </div>
  </main>

  );

  

  
}

export default Form;
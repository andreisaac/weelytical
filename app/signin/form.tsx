"use client"
import {useState} from "react";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import EmailInput from "@components/form/EmailInput";
import PasswordInput from "@components/form/PasswordInput";
import {createClient} from "@utils/supabase/client";
import googleLogo from "@images/googleLogo.svg";
import githubLogo from "@images/githubLogo.svg";

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenber, setRemenber] = useState(false);
  const [err, setErr] = useState({login: "", email: "", password: {
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  }});


const errUpdate = (n:string, v:string|boolean) => {
    setErr(Object.assign(err, {[n]: v}))
  }

  const submitLogin = async() => {
    console.log(email.length > 0 && err.email.length > 0);
    
    if(isPasswordValid() && password.length > 0) {
      setErr({...err, login: "Invalid password"})
    } else if(email.length > 0 && err.email.length > 0){
      setErr({...err, login: "Invalid email"})
    } else {
      if(!email) {setErr({...err, login: "Email required"})}
      else if(!password) {setErr({...err, login: "Password required"})}
      else {
        const {data, error} = await createClient().auth.signInWithPassword({
          email, password
        });
        
        if(data.user) {
          location.reload();
          router.push("/dashboard");
        } else {
          setErr({...err, login: error?.message!})
        }
      }
      
    }
  };

  const isPasswordValid = () => {
    return !Object.values(err.password).every(Boolean);
  };

  const supabase = createClient();
  const providerAuth = async(provider:any) => {
    const signUp = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: process.env.NEXT_PUBLIC_LOCAL_API_URL+"dashboard"
      }
    });
  };

  return (
      <div className="flex flex-col mt-8 w-full">
        <div className="flex flex-col mt-8 gap-4">
          <a onClick={()=>{providerAuth("google")}} className="p-3 block text-center h3 text-n700 rounded-lg bg-n100 border border-n200 cursor-pointer hover:scale-105 active:scale-100 transition ease-out hover:ease-in"><Image src={googleLogo} width={30} height={30} alt="google logo" className="inline mr-4"></Image> Sign In with Google</a>
          <a onClick={()=>{providerAuth("github")}} className="p-3 block text-center h3 text-n100 rounded-lg bg-n800 border border-n200 cursor-pointer hover:scale-105 active:scale-100 transition ease-out hover:ease-in"><Image src={githubLogo} width={40} height={40} alt="github logo" className="inline mr-4"></Image> Sign In with GitHub</a>
        </div>
        <EmailInput name="email" value={email} error={err} label="Email:" inputUpdate={setEmail} errorUpdate={errUpdate} required={true}/>
        <PasswordInput name="password" value={password} error={err} label="Password:" inputUpdate={setPassword} errorUpdate={errUpdate}/>
        <div className="flex flex-row mt-10">
          <div className="form-control flex-1">
            <label className="label cursor-pointer justify-normal">
              <span className="label-text text-n700 mr-4">Remember me</span>
              <input type="checkbox" name="remeber" onClick={()=>setRemenber(!remenber)} className="checkbox border-n300  [--chkbg:theme(colors.n900)] [--chkfg:orange] checked:border-indigo-800" />
            </label>
          </div>

          <button onClick={submitLogin}
          className="py-2 px-14 h3 disabled:cursor-not-allowed disabled:bg-purple300 bg-purple500 rounded-lg text-n100 cursor-pointer transition ease-in-out hover:scale-105 active:scale-95">Sign In</button>
        </div>
        
        {err.login ? (
          <div role="alert" className="alert alert-error mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{err.login}</span>
        </div>
        ) : ""}
        

      </div>
  );
}

export default Form;
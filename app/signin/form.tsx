"use client"
import {useState} from "react";
import EmailInput from "@components/form/EmailInput";
import PasswordInput from "@components/form/PasswordInput";



const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenber, setRemenber] = useState(false);
  const [error, setError] = useState({email: "", password: {
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  }});

  const errorUpdate = (n:string, v:string|boolean) => {
    setError(Object.assign(error, {[n]: v}))
  }

  const isPasswordValid = () => {
    return !Object.values(error.password).every(Boolean);
  };
  return (
      <div className="flex flex-col mt-8 w-full">
        <EmailInput name="email" value={email} error={error} label="Email:" inputUpdate={setEmail} errorUpdate={errorUpdate} required={true}/>
        <PasswordInput name="password" value={password} error={error} label="Password:" inputUpdate={setPassword} errorUpdate={errorUpdate}/>
        <div className="flex flex-row mt-10">
          <div className="form-control flex-1">
            <label className="label cursor-pointer justify-normal">
              <span className="label-text text-n700 mr-4">Remember me</span>
              <input type="checkbox" name="remeber" onClick={()=>setRemenber(!remenber)} className="checkbox border-n300  [--chkbg:theme(colors.n900)] [--chkfg:orange] checked:border-indigo-800" />
            </label>
          </div>

          <button
          className="py-2 px-14 h3 disabled:cursor-not-allowed disabled:bg-purple300 bg-purple500 rounded-lg text-n100 cursor-pointer transition ease-in-out hover:scale-110">Sign In</button>
        </div>
      </div>
  );
}

export default Form;
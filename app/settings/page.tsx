"use client"
import {useState, useEffect} from "react";
import uid from "@utils/uid"
import Image from "next/image";
import Link from "next/link";
import NameInput from "@components/form/NameInput"
import EmailInput from "@components/form/EmailInput"

interface email {
  id: string,
  primary: boolean,
  verified: boolean,
  email: string,
  verifyCode?: string,
  expiration?: Date 
}
interface user {
  id: string,
  display: string,
  email: email[]
}

let u: user = {
  id: "aspdokapsodkpaosksomeid",
  display: "Andred",
  email: [{id:uid(), primary: true, verified: true, email: "andredisaac@gmail.com"},
    {id:uid(), primary: false, verified: false, email: "someshitmail@cona.pt"}
  ],
}

const GeneralSettings = () => {
  const [user, setUser] = useState(u);
  const [display, setDisplay] = useState(user.display);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({display: "", email: ""});
  const [addEmail, setAddEmail] = useState(false); 
 

  const errUpdate = (n: string, v: string) => {
    setError({...error, [n]:v})
  };

  const submitDisplay = ()=>{

  }
  const submitEmail = ()=>{
    const z = user.email.find((item)=>item.email == email);
    console.log(z);
    
    if(!user.email.find((item)=>item.email === email)){
      setUser({...user, email: [...user.email, {id: uid(), primary: false, verified: false, email: email}]}) 
      setError({...error, email: ""})
    } else {
      setError({...error, email: "Email already in use."})
      setTimeout(()=>{setError({...error, email: ""})}, 5000)
    }
      setEmail("");
      setAddEmail(false);
  }

  const primaryEmail = (id:string) => {
    const e = user.email.find((item, index)=> item.id === id);
    if(e?.verified) {
      const p = user.email.find((item, index)=> item.primary === true);
      e? e.primary = true : "";
      p? p.primary = false : "";
      if(e && p) {
        const f = user.email.filter((item, index)=> (item.id !== e.id) && (item.id !== p.id));
        setUser({...user, email: [...f, e, p]})
      }
    } else {
      setError({...error, email: "Email must be verified."})
      setTimeout(()=>{setError({...error, email: ""})}, 5000)
    }
  };

  const delEmail = (id:string) => {
    const e = user.email.filter((item) => {
      if(!item.primary) {
        return item.id !== id
      } else {
        return true
      }
    });
    
    setUser({...user, email: e})
    console.log(e);
    
  }

  return (
    <main className="flex-1 py-8 flex flex-col gap-4 children">
      
      <section className="mx-10 mt-8 bg-n100 border border-n300 rounded-lg">
        <div className="py-4 px-10">
          <h3>Display Name</h3>
          <NameInput placeholder="Display name" name="display" value={display} label="Please enter your full name, or a display name you are comfortable with." inputUpdate={setDisplay} error={error.display} errorUpdate={errUpdate}/>
        </div>
        <div className="px-10 py-2 flex flex-row border-t border-n300">
          <span className="flex-1 self-center">Please use 40 characters at maximum.</span>
          <button disabled={error?.display !== ""} className="btn-dash !btn-sm !bg-white hover:!bg-n200">Save</button>
        </div>
      </section>



      <section className="mx-10 mt-8 bg-n100 border border-n300 rounded-lg">
        <div className="py-4 px-10">
          <h3>Email</h3>
          <p>Enter the email addresses you want to use to log in with Vercel. Your primary email will be used for account-related notifications.</p>
          <div className="my-4 px-14 py-2 bg-n600 text-n100 flex flex-col gap-2 rounded-xl border border-n300">
              {user.email.map((item, index, arr) => {
                return ( 
                <div key={item.id} className="flex flex-row gap-2 items-center">
                  <div key={item.id} className="flex-1 flex gap-4">
                    {item.email}
                    {item.primary ? <div className="h-6 badge badge-success bg-green-400 text-green-700 font-medium gap-2">Primary</div> : ""}
                    {item.verified ? 
                      <div className="h-6 badge badge-info bg-blue-400 text-blue-700 font-medium gap-2">Verified</div> : 
                      <div className="h-6 badge badge-info bg-orange-400 text-orange-900 font-medium gap-2">Unverified</div>
                    }
                  </div>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn bg-opacity-0 border-0 !text-3xl !font-black hover:bg-n500">
                      <span className="mt-[-15px] text-n100">...</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-n700 rounded-lg z-[1] w-52 p-2 shadow border border-n500">
                      {!item?.primary ? (<li><a onClick={()=>primaryEmail(item.id)}>Set to primary</a></li>) : ""}
                      <li><a onClick={()=>delEmail(item.id)}>Delete</a></li>
                    </ul>
                  </div>
                </div>
                )
              })}
          </div>
          
          {addEmail ? 
            <EmailInput name="email" value={email} label="Add a new email address to your account. This email, once verified, can be used to login to your account." inputUpdate={setEmail} error={error.email} errorUpdate={errUpdate}/>
            :
            <a className="btn-dash !bg-white hover:!bg-n200" onClick={()=>setAddEmail(true)}>+ Add Another</a>
            }

          {error?.email && !addEmail ? (
            <div role="alert" className="alert alert-error my-2">
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
            <span>Error! {error.email}</span>
          </div>
          ) : ""}
     
        </div>
        <div className="px-10 py-2 flex flex-row border-t border-n300">
          <span className="flex-1 self-center">Emails must be verified to be able to login with them or be used as primary email.</span>
          <button onClick={submitEmail} disabled={email === ""} className="btn-dash !btn-sm !bg-white hover:!bg-n200">Save</button>
        </div>
      </section>



      <section className="mx-10 mt-8 bg-n100 border border-red900 rounded-lg">
        <div className="py-4 px-10">
          <h3>Delete Account</h3>
          <p>Permanently remove your Personal Account and all of its contents from Weelytical. This action is not reversible, so please continue with caution.</p>
        </div>
        <div className="px-10 py-2 flex flex-row border-t border-red900 bg-red300 bg-opacity-50">
          <span className="flex-1 self-center"> </span>
          <button disabled={error?.display !== ""} className="btn btn-error btn-sm font-medium">Delete Account</button>
        </div>
      </section>



    </main>
  );
}

export default GeneralSettings;
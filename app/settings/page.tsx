"use client"
import {useState, useEffect, useRef} from "react";
import uid from "@utils/uid"
import {useRouter} from "next/navigation";
import Image from "next/image";
import googleLogo from "@images/googleLogo.svg";
import githubLogo from "@images/githubLogo.svg";
import NameInput from "@components/form/NameInput"
import EmailInput from "@components/form/EmailInput"
import { createClient } from "@utils/supabase/client";
import { Dialog } from "@utils/types";

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
  const deleteModalRef = useRef<Dialog>(null);
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [display, setDisplay] = useState();
  const [email, setEmail] = useState("");
  const [del, setDel] = useState("");
  const [err, setErr] = useState({display: "", email: "", del: ""});
  const [addEmail, setAddEmail] = useState(false); 

  const supabase = createClient();

  useEffect(()=>{
    const asyncFunc = async()=>{

      const { data, error } = await supabase.auth.getSession()
      
      if(data.session) {
        setUser(data.session.user);
        setDisplay(data.session.user.user_metadata.display_name || data.session.user.user_metadata.name)
      } else {
        router.push("signIn")
      }
    };
    asyncFunc();
  },[])
 

  const errUpdate = (n: string, v: string) => {
    setErr({...err, [n]:v})
  };

  const submitDisplay = async()=>{
    if(display && !err.display && (display !== user?.user_metadata.display_name)){
      console.log("ya");
      
      const { data, error } = await supabase.auth.updateUser({
        data: {display_name: display}
      });
      if(data.user){
        setUser(data.user);
        setDisplay(data.user.user_metadata.display_name);
      } else {
        alert(error);
      }
    } else {
      console.log("nop");
    }

  };

  const providerAuth = async(provider:any) => {
    const signUp = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: process.env.NEXT_PUBLIC_LOCAL_API_URL+"settings"
      }
    });
  }

  const deleteAcc = async() =>{
    if(del === "delete") {
      const req = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+"api/user/delete", {
        method: "DELETE", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({userId: user.id, trusted: true})
      });

      console.log("Yep");
      
    }
  }

  return (
    <main className="flex-1 py-8 flex flex-col gap-4 children">
      
      <section className="mx-10 mt-8 bg-n100 border border-n300 rounded-lg min-h-[202px]">

            <div className="py-4 px-10">
              <h3>Display Name</h3>
              {display ? 
                <NameInput placeholder="Display name" name="display" value={display||""} label="Please enter your full name, or a display name you are comfortable with." inputUpdate={setDisplay} error={err.display} errorUpdate={errUpdate}/>

              :
                <span className="loading loading-spinner loading-lg bg-n700 mt-10"></span> 
              }
            </div>
            <div className="px-10 py-2 flex flex-row border-t border-n300">
              <span className="flex-1 self-center">Please use 40 characters at maximum.</span>
              {}
              <button disabled={err?.display !== ""} onClick={submitDisplay} className="btn-dash !btn-sm !bg-white hover:!bg-n200">Save</button>
            </div>
        
      </section>



      <section className="mx-10 mt-8 bg-n100 border border-n300 rounded-lg">
        <div className="py-4 px-10">
          <h3>Identity Manager</h3>
          <p>Enter the email addresses you want to use to log in with Vercel. Your primary email will be used for account-related notifications.</p>
          <div className="my-4 px-14 py-2 bg-n600 text-n100 flex flex-col gap-2 rounded-xl border border-n300">
              {user ? 
                <div key={user && user.identities[0].id} className="flex flex-row gap-2 items-center">
                  <div key={user && user.identities[0].id} className="flex-1 flex gap-4 py-2">
                    {user && user.identities[0].identity_data.email}
                    {user && user.identities[0].primary ? <div className="h-6 badge badge-success bg-green-400 text-green-700 font-medium gap-2">Primary</div> : ""}
                    {user.email_confirmed_at && user && user.identities[0].identity_data.email ? 
                      <div className="h-6 badge badge-info bg-blue-400 text-blue-700 font-medium gap-2">Verified</div> : 
                      <div className="h-6 badge badge-info bg-orange-400 text-orange-900 font-medium gap-2">Unverified</div>
                    }
                  </div>
              </div>
            :null}
        
          </div>
          
          {addEmail ? 
            <>
              <div className="flex flex-row gap-10">
                {user.app_metadata.providers.filter(item=>item === "google").length < 1 ?
                  <a onClick={()=>providerAuth("google")} className="mx-10 p-1 pt-2 flex-1 text-center h3 text-n700 rounded-lg bg-white border border-n200 cursor-pointer hover:scale-105 transition ease-out hover:ease-in active:scale-100"><Image src={googleLogo} width={30} alt="google logo" className="inline mr-4 h-auto"></Image> Link Google</a>
                :null}
                {user.app_metadata.providers.filter(item=>item === "github").length < 1 ?
                  <a onClick={()=>providerAuth("github")} className="mx-10 p-1 pt-2 flex-1 text-center h3 text-n100 rounded-lg bg-n800 border border-n200 cursor-pointer hover:scale-105 transition ease-out hover:ease-in active:scale-100"><Image src={githubLogo} width={40} alt="github logo" className="inline mr-4val"></Image> Link GitHub</a>
                :null}
                {user.app_metadata.providers.filter(item=>item === "email").length < 1 ?
                  <EmailInput name="email" label="Email:" value={email} error={err.email} inputUpdate={setEmail} errorUpdate={errUpdate}/>
                :null}
                </div>
            </>
            :
            <a className="btn-dash !bg-white hover:!bg-n200" onClick={()=>setAddEmail(true)}>+ Add Another</a>
            }

          {err?.email && !addEmail ? (
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
            <span>Error! {err.email}</span>
          </div>
          ) : ""}
        </div>
        <div className="px-10 py-2 flex flex-row border-t border-n300">
          <span className="flex-1 self-center my-1">Emails must be verified to be able to login with them or be used as primary email.</span>
        </div>
      </section>



      <section className="mx-10 mt-8 bg-n100 border border-red900 rounded-lg">
        <div className="py-4 px-10">
          <h3>Delete Account</h3>
          <p>Permanently remove your Personal Account and all of its contents from Weelytical. This action is not reversible, so please continue with caution.</p>
        </div>
        <div className="px-10 py-2 flex flex-row border-t border-red900 bg-red300 bg-opacity-50">
          <span className="flex-1 self-center"> </span>
          <button disabled={err?.display !== ""} className="btn btn-error btn-sm font-medium" onClick={()=>deleteModalRef.current?.showModal()}>Delete Account</button>
        </div>
      </section>

      <dialog ref={deleteModalRef} id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red900">Delete Account</h3>
          <p className="py-4">Type delete to finish this action.</p>
          
          <NameInput name={del} placeholder="Type delete" value={del} inputUpdate={setDel} errorUpdate={errUpdate} error={err.del}/>
          <button disabled={del !== "delete"} className="btn font-medium btn-error mt-2 float-right" onClick={deleteAcc}>Delete</button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </main>
  );
}

export default GeneralSettings;
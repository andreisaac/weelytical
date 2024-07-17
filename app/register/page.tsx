import { cookies } from 'next/headers'
import type { Metadata } from "next";
import Form from "./form";
import {AnimatePresence} from "framer-motion";


export const metadata: Metadata = {
  title: "Sign Up"
};


const SignIn = () => {
  const cookieStore = cookies();
  const type:string|undefined = cookieStore.get("type")?.value;
  const projectName:string|undefined = cookieStore.get("projectName")?.value;  
  const email:string|undefined = cookieStore.get("email")?.value;  
  const verification:string|undefined = cookieStore.get("verification")?.value;  
  
  return (
    <main className="min-h-[88vh] relative mt-10 children">
      

       <Form cType={type} cProjectName={projectName} cEmail={email} cVerification={verification}/>
  
    </main>
  );
}

export default SignIn;
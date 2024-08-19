import { cookies } from 'next/headers';
import type { Metadata } from "next";
import Form from "./form";
import {createClient} from "@utils/supabase/server";


export const metadata: Metadata = {
  title: "Register Project"
};


const SignIn = async() => {
  const cookieStore = cookies();
  
  const type:string|undefined = cookieStore.get("type")?.value;
  const projectName:string|undefined = cookieStore.get("projectName")?.value;  
  const displayName:string|undefined = cookieStore.get("displayName")?.value;  
  const domain:string|undefined = cookieStore.get("domain")?.value;  

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser()
  console.log(user);
  
  return (
    <main className="min-h-[88vh] relative mt-10 children">
      
       <Form cType={type} cProjectName={projectName} cDisplayName={displayName} cDomain={domain} cUser={user}/>
  
    </main>
  );
}

export default SignIn;
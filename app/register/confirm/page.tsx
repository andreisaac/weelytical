import type { Metadata } from "next";
import {createClient} from "@utils/supabase/server";
import Form from "./form"


export const metadata: Metadata = {
  title: "Register Project"
};


const SignIn = async() => {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser()
  
  return (
    <main className="min-h-[88vh] relative mt-10 children">
      
      <main className="max-md:px-4 md:w-[600px] mx-auto mt-40">

      <h2 className="text-center font-normal">A confirmation email was sent to your email, click on the link provided on the email to confirm your account.</h2>

      <h3 className="text-center mt-96">{"Didn\'t get your confirmation email?"}</h3>
      <h3 className="text-center">Enter your email to resend.</h3>

      <div className="flex flex-col w-full">
        <Form/>
      </div>

    </main>
  
  </main>
  );
}

export default SignIn;
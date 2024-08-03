import type { Metadata } from "next";
import Form from "./form";


export const metadata: Metadata = {
  title: "Sign Up"
};


const SignIn = () => {
  
  return (
    <main className="min-h-[88vh] relative mt-10 children">
      
       <Form/>
  
    </main>
  );
}

export default SignIn;
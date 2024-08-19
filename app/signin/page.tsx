
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import arrow from "@images/arrowRound.svg"
import Form from "./form";


export const metadata: Metadata = {
  title: "SignIn"
};




const SignIn = () => {

  return (
    <main className="max-md:px-4 md:w-[500px] min-h-[88vh] mx-auto children">
      <h1 className="text-n700 text-center mt-14">Sign In</h1>
      
      <Form/>
  
      <div className="border-t-2 border-n200 mt-10 pt-2 text-center">
          <h3 className="my-6">Don’t have an account?</h3> 
          <Link href="/register/signup" className="btn-try">
           Sign Up
           <Image src={arrow} width={30} height={30} loading="lazy" alt="arrow right" className="inline-block pb-1 ml-4"></Image>
          </Link>
      </div>
    </main>
  );
}

export default SignIn;

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import arrow from "@images/arrowRound.svg"
import googleLogo from "@images/googleLogo.svg";
import githubLogo from "@images/githubLogo.svg";
import Form from "./form";


export const metadata: Metadata = {
  title: "SignIn"
};


const SignIn = () => {
  return (
    <main className="w-[500px] min-h-[88vh] mx-auto">
      <h1 className="text-n700 text-center mt-14">Sign In</h1>
      <div className="flex flex-col mt-8 gap-4">
        <a className="p-3 block text-center h3 text-n700 rounded-lg bg-n100 border border-n200 cursor-pointer hover:scale-105 transition ease-out hover:ease-in"><Image src={googleLogo} width={30} height={30} alt="google logo" className="inline mr-4"></Image> Sign In with Google</a>
        <a className="p-3 block text-center h3 text-n100 rounded-lg bg-n800 border border-n200 cursor-pointer hover:scale-105 transition ease-out hover:ease-in"><Image src={githubLogo} width={40} height={40} alt="google logo" className="inline mr-4"></Image> Sign In with GitHub</a>
      </div>
      <Form/>
      <div className="border-t-2 border-n200 mt-10 pt-2 text-center">
          <h3 className="my-6">Don’t have an account?</h3>
          <Link href="/register" className="btn-try">
           Sign Up
           <Image src={arrow} width={30} height={30} loading="lazy" alt="arrow right" className="inline-block pb-1 ml-4"></Image>
          </Link>
        </div>
    </main>
  );
}

export default SignIn;
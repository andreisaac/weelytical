"use client"
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import logo from "@images/logo.svg"
import arrow from "@images/arrowRound.svg"
import {createClient } from "@utils/supabase/client";

const supabase = createClient();

const signOut = async() =>{
  const { error } = await supabase.auth.signOut()
  error ? console.log(error) : console.log("SignOut");
};



const getUser = async () =>{
  const { data } = await supabase.auth.getUser();
  return data.user
}



const Navbar = () => {
  const [toggle, setToggle] = useState(false);

    return (
      <header className="flex flex-wrap select-none text-n800 text-xl relative pt-1">
        <Link href="/" className="flex-wrap my-1 font-bold justify-center px-12 text-2xl max-lg:hidden text-purple900"><Image src={logo} width={28} loading="lazy" alt="weelytical" className="inline-block pb-2 mr-[6px] h-auto hover:rotate-6 transition ease-out hover:ease-in"></Image> Weelytical</Link>
        <nav className="flex flex-row-reverse flex-1 gap-9 items-center px-12 max-lg:hidden">
          <Link href="/register/signup" className="btn-try">
           Try Free!
           <Image src={arrow} width={30} height={30} loading="lazy" alt="arrow right" className="inline-block pb-1 ml-4"></Image>
          </Link>
          <Link href="/signin" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Sign In</Link>
          <Link href="/" onClick={signOut} className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Sign Out</Link>
          <Link href="/docs" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Docs</Link>
          <Link href="/pricing" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Pricing</Link>
          <Link href="/dashboard" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Dashboard</Link>
          <Link href="/settings" className="rounded-full px-[14px] py-2 bg-purpleBlack hover:scale-110 active:scale-100 text-n100 self-stretch my-auto hover:text-n200 transition ease-out hover:ease-in">AI</Link>
          
        </nav>
      </header>
    )
}

export default Navbar;
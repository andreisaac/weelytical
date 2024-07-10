"use client"
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import logo from "@images/logo.svg"
import arrow from "@images/arrowRound.svg"


const Navbar = () => {
  const [toggle, setToggle] = useState(false);

    return (
      <header className="flex flex-wrap select-none text-n800 text-xl relative pt-1">
        <Link href="/" className="flex-wrap my-1 font-bold justify-center px-12 text-2xl max-lg:hidden text-purple900"><Image src={logo} width={28} loading="lazy" alt="weelytical" className="inline-block pb-2 mr-[6px] h-auto hover:rotate-6 transition ease-out hover:ease-in"></Image> Weelytical</Link>
        <nav className="flex flex-row-reverse flex-1 gap-9 items-center px-12 max-lg:hidden">
          <Link href="/register" className="btn-try">
           Try Free!
           <Image src={arrow} width={30} height={30} loading="lazy" alt="arrow right" className="inline-block pb-1 ml-4"></Image>
          </Link>
          <Link href="/signin" className="self-stretch my-auto hover:text-orange900 hover:scale-110 transition ease-out hover:ease-in">Sign In</Link>
          <Link href="/docs" className="self-stretch my-auto hover:text-orange900 hover:scale-110 transition ease-out hover:ease-in">Docs</Link>
          <Link href="/pricing" className="self-stretch my-auto hover:text-orange900 hover:scale-110 transition ease-out hover:ease-in">Pricing</Link>
          <Link href="/dashboard" className="self-stretch my-auto hover:text-orange900 hover:scale-110 transition ease-out hover:ease-in">Dashboard</Link>
          
        </nav>
      </header>
    )
}

export default Navbar;
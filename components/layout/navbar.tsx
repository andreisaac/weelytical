"use client"
import Image from "next/image";
import Link from "next/link";
import {useContext, useEffect, useRef} from "react";
import logo from "@images/logo.svg"
import arrow from "@images/arrowRound.svg"
import { useUserContext } from '../../app/context/userContext'
import {createClient } from "@utils/supabase/client";


const supabase = createClient();



const Navbar = (props: any) => {
  const drawerRef = useRef<HTMLLabelElement>(null);
  const {user, dispatch} = useUserContext();
  console.log(user);
  

  const signOut = async() =>{
    const { error } = await supabase.auth.signOut()
    error ? console.log(error) : dispatch( {type: "signOut"} );
    console.log(user)
    clickSm();
  };

  const clickSm = () =>{
    if (drawerRef.current) {
      drawerRef.current.click()
    }
  }

    return (
      <>
      <header className="flex flex-wrap select-none text-n800 text-xl relative pt-1 max-lg:hidden">
        <Link href="/" className="flex-wrap my-1 font-bold justify-center px-12 text-2xl text-purple900"><Image src={logo} width={28} loading="lazy" alt="weelytical" className="inline-block pb-2 mr-[6px] h-auto hover:rotate-6 transition ease-out hover:ease-in"></Image> Weelytical</Link>
        <nav className="flex flex-row-reverse flex-1 gap-9 items-center px-12 max-lg:hidden">
          {user ? 
            <>
              <Link href="/settings" className="rounded-full px-[14px] py-2 bg-purpleBlack hover:scale-110 active:scale-100 text-n100 self-stretch my-auto hover:text-n200 transition ease-out hover:ease-in">AI</Link>
              <Link href="/" onClick={signOut} className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Sign Out</Link>
              <Link href="/docs" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Docs</Link>
              <Link href="/dashboard" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Dashboard</Link>
            </>
            :
            <>
              <Link href="/register/signup" className="btn-try">
                Try Free!
                <Image src={arrow} width={30} height={30} loading="lazy" alt="arrow right" className="inline-block pb-1 ml-4"></Image>
              </Link>
              <Link href="/signin" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Sign In</Link>
              <Link href="/pricing" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Pricing</Link>
            </>
            }
          
        </nav>
      </header>

        <div className="drawer lg:hidden z-50">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Navbar */}
            <div className="navbar w-full bg-white border-b border-n200 grid justify-items-end">
              <div className="flex-none">
                <label  htmlFor="my-drawer-3" className="drawer-button swap swap-rotate">
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" />
                  {/* hamburger icon */}
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512">
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  {/* close icon */}
                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512">
                    <polygon
                      points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label ref={drawerRef} htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4 gap-4 text-xl">
            {user ? 
            <>
              <li><Link onClick={clickSm} href="/docs" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Docs</Link></li>
              <li><Link onClick={clickSm} href="/dashboard" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Dashboard</Link></li>
              <li><Link onClick={clickSm} href="/settings" className="rounded-full px-[14px] py-2 bg-purpleBlack hover:scale-110 active:scale-100 text-n100 self-stretch my-auto hover:text-n200 transition ease-out hover:ease-in">Settings</Link></li>
              <li><Link onClick={signOut} href="/" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Sign Out</Link></li>
            </>
            :
            <>
              <li><Link onClick={clickSm} href="/register/signup" className="btn-try w-48 text-right">
                Try Free!
                <Image src={arrow} width={30} height={30} loading="lazy" alt="arrow right" className="inline-block pb-1 ml-4"></Image>
              </Link></li>
              <li><Link onClick={clickSm} href="/signin" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Sign In</Link></li>
              <li><Link onClick={clickSm} href="/pricing" className="self-stretch my-auto hover:text-orange900 hover:scale-110 active:scale-100 transition ease-out hover:ease-in">Pricing</Link></li>
            </>
            }
            </ul>
          </div>
        </div>
      </>
      
    )
}

export default Navbar;
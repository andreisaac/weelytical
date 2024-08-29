"use client"
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import logo from "@images/logo.svg"
import arrow from "@images/arrowRound.svg"


const Navbar = () => {
  const [toggle, setToggle] = useState(false);

    return (
      <footer className="w-full max-md:flex-wrap max-md:gap-3 max-md:py-4 max-md:px-8 mt-14 py-10 px-28 flex flex-row border-t border-n300 bg-n100 text-n800 shadow-inner">
        <div className="flex-1">
          <p className="mb-2 font-medium">Learn:</p>
          <p><Link href="/docs" className="ml-4 mb-2">Documentation</Link></p>
          <p><Link href="/docs/samples" className="ml-4 mb-2">Getting started</Link></p>
        </div>
        <div className="flex-1">
          <p className="mb-2 font-medium">Get connected:</p>
          {/*<p><Link href="/docs" className="ml-4 mb-2">Youtube</Link></p>
          <p><Link href="/docs/samples" className="ml-4 mb-2">Instagram</Link></p> */}
        </div>
        <div className="max-md:mx-auto lg:flex-1">
          <p className="mb-2 font-medium">Suporte:</p>
          {//<p><Link href="/docs" className="ml-4 mb-2">Contact support</Link></p>
          }
          <p><Link href="/release-notes" className="ml-4 mb-2">Release Notes</Link></p>
        </div>
      </footer>
    )
}

export default Navbar;
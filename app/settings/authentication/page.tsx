"use client"
import {useState, useEffect} from "react";
import uid from "@utils/uid"
import Image from "next/image";
import Link from "next/link";
import googleLogo from "@images/googleLogo.svg"
import githubLogo from "@images/githubLogo.svg"

interface email {
  id: string,
  primary: boolean,
  verified: boolean,
  email: string,
  verifyCode?: string,
  expiration?: Date 
}
interface user {
  id: string,
  display: string,
  email: email[]
}

let u: user = {
  id: "aspdokapsodkpaosksomeid",
  display: "Andred",
  email: [{id:uid(), primary: true, verified: true, email: "andredisaac@gmail.com"},
    {id:uid(), primary: false, verified: false, email: "someshitmail@cona.pt"}
  ],
}

const Authentication = () => {


  return (
    <main className="flex-1 py-8 flex flex-col gap-4 children">
      <section className="mx-10 mt-2">
        <h2>Authentication</h2>
        <p>Connect your Vercel Account with a third-party service to use it for login.</p>
      </section>

      <section className="mx-10 mt-8 bg-n100 border border-n300 rounded-lg">
        <div className="px-8 py-6 border-b border-n300">
          <h3>Add new</h3>
        </div>
        <div className="flex flex-row gap-4 p-2">
          <a className="self-center py-2 px-4 text-center text-n700 rounded-lg bg-white border border-n200 cursor-pointer hover:scale-105 active:scale-100 transition ease-out hover:ease-in"><Image src={googleLogo} width={25} height={25} alt="google logo" className="inline mr-4"></Image> Sign In with Google</a>
          <a className="self-center py-1 px-4 text-center text-n100 rounded-lg bg-n800 border border-n200 cursor-pointer hover:scale-105 active:scale-100 transition ease-out hover:ease-in"><Image src={githubLogo} width={35} height={35} alt="github logo" className="inline mr-4"></Image> Sign In with GitHub</a>
        </div>
      </section>

      <section className="px-8 py-4 mx-10 mt-8 bg-n800 border border-n300 flex flex-row gap-4 items-center rounded-lg">
        <div>
          <Image src={githubLogo} width={35} height={35} alt="google logo" className="inline mr-4"></Image>
        </div>
        <div className="">
          <p className="py-0 font-medium text-n100">Github</p>
          <p className="py-0 text-sm text-blue500">(<Link href="https://github.com/andreisaac">@andreisaac</Link>)</p>
        </div>
        <div className="flex-1 text-right">
          <p className="text-n300">Connected 31d ago</p>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn bg-opacity-0 border-0 !text-3xl !font-black hover:bg-n500">
            <span className="mt-[-15px] text-n100">...</span>
          </div>
          <ul tabIndex={0} className="text-n100 dropdown-content menu bg-n700 rounded-lg z-[1] w-52 p-2 shadow border border-n500">
  
            <li><a className="text-red900 font-medium" onClick={()=>(null)}>Disconnect GitHub</a></li>
          </ul>
        </div>
      </section>

      <section className="px-8 py-4 mx-10 bg-white border border-n300 flex flex-row gap-4 items-center rounded-lg">
        <div>
          <Image src={googleLogo} width={35} height={35} alt="google logo" className="inline mr-4"></Image>
        </div>
        <div className="">
          <p className="py-0 font-medium text-n800">Google</p>
          <p className="py-0 text-sm text-blue900">(<Link href="https://github.com/andreisaac">@andreisaac</Link>)</p>
        </div>
        <div className="flex-1 text-right">
          <p className="text-n600">Connected 31d ago</p>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn bg-opacity-0 border-0 !text-3xl !font-black hover:bg-n500">
            <span className="mt-[-15px] text-n800">...</span>
          </div>
          <ul tabIndex={0} className="text-n100 dropdown-content menu bg-n700 rounded-lg z-[1] w-52 p-2 shadow border border-n500">
  
            <li><a className="text-red900 font-medium" onClick={()=>(null)}>Disconnect Google</a></li>
          </ul>
        </div>
      </section>



    </main>
  );
}

export default Authentication;
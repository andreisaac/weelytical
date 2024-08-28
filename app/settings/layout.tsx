"use client";
import React, {useRef} from "react";
import Link from "next/link";


  
const Layout = ({
    children
  }: {
    children: React.ReactNode
  }) => {
    const settingsdRef = useRef<HTMLLabelElement>(null);

    const clickSm = () =>{
      if (settingsdRef.current) {
        settingsdRef.current.click()
      }
    }

    return (
        <main className="lg:mt-10 lg:border-2 border-n300 rounded-xl text-n700 shadow-2xl">
            <h2 className="max-lg:hidden py-8 px-20 bg-n100 border-b-2 border-n300 rounded-t-xl">Account Settings</h2>
            <div className="flex flex-col lg:flex-row">
                <div className="max-lg:hidden py-8 px-20 flex flex-col w-80 gap-2 text-xl">
                    <Link href="/settings">General</Link>
                    {/* <Link href="/settings/teams">Teams</Link> */}
                    <Link href="/settings/billing">Billing</Link>
                    <Link href="/settings/invoices">Invoices</Link>
                </div>
                <div className="drawer xl:hidden">
                  <input id="docs" type="checkbox" className="drawer-toggle" />
                  <div className="drawer-content">
                    {/* Navbar */}
                    <div className="navbar w-full bg-n100 border-y border-n200 grid">
                      <div className="flex-none">
                        <label ref={settingsdRef} htmlFor="docs" className="drawer-button swap swap-rotate">
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
                        <label className="ml-8 text-lg">Account Settings</label>
                      </div>
                    </div>
                  </div>
                  <div className="drawer-side z-50">
                    <label htmlFor="docs" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="pt-20 menu bg-base-200 min-h-full w-80 p-4 gap-4 text-xl">           
                      <li><Link onClick={clickSm} href="/settings">General</Link></li>
                      <li><Link onClick={clickSm} href="/settings/billing">Billing</Link></li>
                      <li><Link onClick={clickSm} href="/settings/invoices">Invoices</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </main>
        
    )
  }


export default Layout;
"use client"
import React, {useRef} from "react";
import Link from "next/link";

const Layout = ({
    children
  }: {
    children: React.ReactNode
  }) => {
    const docsRef = useRef<HTMLLabelElement>(null);
    const clickSm = () =>{
        if (docsRef.current) {
          docsRef.current.click()
        }
    }
    return (
        <main className="xl:px-8 lg:mt-10 rounded-xl text-n700">
            <div className="xl:flex xl:fex-row xl:border border-n300 rounded-xl">
                <div className="max-xl:hidden py-8 px-20 flex flex-col w-80 gap-2 bg-n100 border-r border-n300  rounded-l-xl text-xl">
                    <Link href="/docs">Getting Started</Link>
                    <Link href="/docs/frameworks">Frameworks</Link>
                    <Link href="/docs/react">React JS</Link>
                </div>
                <div className="drawer xl:hidden">
                  <input id="docs" type="checkbox" className="drawer-toggle" />
                  <div className="drawer-content">
                    {/* Navbar */}
                    <div className="navbar w-full bg-n100 border-y border-n200 grid">
                      <div className="flex-none">
                        <label ref={docsRef} htmlFor="docs" className="drawer-button swap swap-rotate">
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
                        <label className="ml-8 text-lg">Documentation</label>
                      </div>
                    </div>
                  </div>
                  <div className="drawer-side z-50">
                    <label htmlFor="docs" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="pt-20 menu bg-base-200 min-h-full w-80 p-4 gap-4 text-xl">           
                      <li><Link onClick={clickSm} href="/docs">Getting Started</Link></li>
                      <li><Link onClick={clickSm} href="/docs/frameworks">Frameworks</Link></li>
                      <li><Link onClick={clickSm} href="/docs/react">React JS</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="py-6 px-4 lg:px-10 xl:px-20 xl:flex-1 xl:flex xl:flex-row min-h-[800px]">
                    {children}
                </div>
            </div>
        </main>
        
    )
  }


export default Layout;
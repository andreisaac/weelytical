import Image from 'next/image';
import Link from 'next/link'
import addUser from "@images/addUser.svg"
import signIn from "@images/signIn.svg"
import arrowRight from "@images/arrowRight.svg"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs",
  description: "Getting started with weelytical analytics.",
};


const ReleaseNotes = () => {

  return (
    <div className='max-w-[1000px] mx-auto lg:text-lg mt-10'>
      <div className='border-b border-n300 pb-10'>
        <h3 className='mt-4 text-2xl lg:text-4xl'>Beta Release 0.1.0</h3>

        <h4 className='mt-8 text-lg xl:text-2xl'>In this first release we only release a small set of features listed below.</h4>

        <ul className='list-disc mt-8 ml-8 text-xl'>
          <li>Create account;</li>
          <li>Create project;</li>
          <li>Google and GitHub authentication;</li>
          <li>Dashboard to analyze traffic and small filtering;</li>
          <li>Settings page with limitations;</li>
          <li>React package to install on your the website;</li>
          <li>Only the free plan is available.</li>
        </ul>

        <p className='mt-8 xl:text-xl'>The next release is planned to have the pro plan, and settings page full functional.</p>
      </div>
    </div>
  );
 
}

export default ReleaseNotes;
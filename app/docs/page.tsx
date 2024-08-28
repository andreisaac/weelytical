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


const GettingStarted = () => {

  return (
    <div className='flex flex-col lg:text-lg'>
      <h3 className='mt-4 text-2xl lg:text-4xl'>Getting Started</h3>

      <h4 className='mt-8 text-lg xl:text-2xl'>This step-by-step tutorial will help you get started with Weelytical, an web traffic analytical tool to help you understand your custumers.</h4>

      <p className='mt-8'>Weelytical is an innovative and budget-friendly solution designed for easy implementation and enhanced user privacy.</p>
      <p> Unlike traditional analytics tools, our platform does not rely on tracking cookies, eliminating the need for cookie consent and ensuring compliance with privacy regulations</p>
    
      <h3 className='mt-8 text-2xl lg:text-3xl'>Before you start</h3>

      <p className='mt-6'>To get started, create an account with Weelytical. You can select the plan that´s right for you.</p>

      <div className='flex flex-col lg:flex-row gap-2 xl:gap-10 mt-4 xl:px-20'>
        <Link href="register/signup" className='flex flex-col gap-2 flex-1 hover:bg-opacity-75 bg-opacity-80 rounded-xl py-6 px-4 xl:px-10 bg-purple900 text-n100 border border-purple-900'>
          <Image src={addUser} width={30} alt="add user" className='h-auto'/>
          <p className='font-medium text-2xl'>Sign Up</p>
          <p className='text-base'>If you never used Weelytical before, sign up for a new Weelytical account.</p>
        </Link>
        <Link href="signin" className='flex flex-col gap-2 flex-1 hover:bg-opacity-75 bg-opacity-80 rounded-xl py-6 px-4 xl:px-10 bg-purple900 text-n100 border border-purple-900'>
          <Image src={signIn} width={30} alt="sign in" className='h-auto'/>
          <p className='font-medium text-2xl'>Sign In</p>
          <p className='text-base'>If you already have a weelytical account, log in to get started.</p>
        </Link>
      </div>

      <p className='mt-6'>Once you create an account, you can choose to authenticate either with a Git/Gmail provider or by using an email. When using email authentication, you may need to confirm both your email address.</p>

      <h3 className='mt-8 text-3xl'>Create a project</h3>
      <p className='mt-4'>After creating your account you need to create a project, the domain name must be correct to weelytical to work. If by mistake you skip the create project step, click on this <Link href={"register/project"} className='text-blue-600 hover:text-blue-400 underline'>link</Link> to create one.</p>


      <h3 className='mt-8 text-2xl xl:text-3xl'>Now that you have your account set up, pick a framework.</h3>

      <div>
        <Link href={"docs/frameworks"} className='mt-8 hover:bg-orange500 bg-orange900 btn btn-lg text-2xl font-normal float-right'>
          Frameworks
          <Image src={arrowRight} width={30} alt="sign in" className='h-auto'/>
        </Link>
      </div>
    </div>
  );
 
}

export default GettingStarted;
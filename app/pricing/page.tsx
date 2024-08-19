
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import check from "@images/check.svg"
import checkWhite from "@images/checkWhite.svg"


export const metadata: Metadata = {
  title: "Pricing",
  description: "Feature rich analytics with free plans to hobbyist's, and a pro plan for professional projects."
};


const Princing = () => {
  
  return (
    <main className="max-lg:mt-8 min-h-[88vh] children">
      <h1 className="text-center text-4xl lg:text-5xl">Our Pricing Plans</h1>
      <h2 className="text-center text-purple900 text-2xl lg:text-3xl">Pick a plan to fit your workflow</h2>
      <div className="max-lg:flex-wrap max-md:gap-8  max-lg:mt-8 lg:mt-28 max-w-full xl:w-[1250px] lg:h-[500px] flex max-md:flex-col flex-row xl:gap-11 flex-shrink-0 mx-auto">

        <section className="max-lg:w-[46%] max-lg:px-4 max-lg:mx-auto max-md:w-[94%] py-6 px-10 flex flex-col xl:w-[400px] bg-purple500 border border-n100 rounded-lg shadow-squareXl shadow-purple300 text-n100">
          <h1 className="max-lg:ml-4 max-lg:text-4xl">Hobby</h1>
          <h2 className="max-lg:ml-4 max-lg:text-3xl text-orange500">Free</h2>
          <p className="max-lg:text-xl text-2xl">Free for small websites or a freelancing project.</p>
          <ul className="my-4 text-lg">
            <li><Image src={checkWhite} width={24} alt="check" className="h-auto inline mr-4"/>3 Projects</li>
            <li><Image src={checkWhite} width={24} alt="check" className="h-auto inline mr-4"/>3500 events</li>
            <li><Image src={checkWhite} width={24} alt="check" className="h-auto inline mr-4"/>1 Month History</li>
            <li className="ml-10">Custom Events</li>
            <li className="ml-10">Flags</li>
            <li className="ml-10">Aditional Events</li>
          </ul>
          <div className="p-2">
            <Link href="/register/signup" className="mx-auto btn border border-n300 h3 bg-white">Try Free!</Link>
          </div>
        </section>

        <section className="max-lg:w-[46%] max-lg:scale-100 lg:scale-110 xl:scale-125 max-lg:px-4 max-lg:mx-auto max-md:w-[94%] py-6 px-8 flex flex-col xl:w-[400px] bg-orange900 border border-n100 rounded-lg shadow-square shadow-orange-500">
          <h1 className="max-lg:ml-4 max-lg:text-4xl text-purple900">Pro</h1>
          <h2 className="max-lg:ml-4 max-lg:text-3xl text-n100"><span className="text-4xl font-bold"> $15</span> <span className="font-medium">/Month</span></h2>
          <p className="max-lg:text-xl text-xl text-n700">Collaborate has a team for
          <span className="font-bold"> $5</span> <span className="font-medium">/Month,</span> per aditional member.</p>
          <ul className="my-4 text-n700 text-base">
            <li><Image src={check} width={24} alt="check" className="h-auto inline mr-4"/>Everything in hobby plan</li>
            <li><Image src={check} width={24} alt="check" className="h-auto inline mr-4"/>Unlimited Projects</li>
            <li><Image src={check} width={24} alt="check" className="h-auto inline mr-4"/>25 000 events</li>
            <li><Image src={check} width={24} alt="check" className="h-auto inline mr-4"/>12 Month History</li>
            <li><Image src={check} width={24} alt="check" className="h-auto inline mr-4"/>100k Aditional Events / 15$</li>
            <li><Image src={check} width={24} alt="check" className="h-auto inline mr-4"/>Custom Events</li>
            <li><Image src={check} width={24} alt="check" className="h-auto inline mr-4"/>Flags</li>
          </ul>
          <div className="p-2">
            <Link href="/register/signup" className="mx-auto btn border border-n300 h3 bg-white">Upgrade Now!</Link>
          </div>
        </section>

        <section className="max-lg:px-4 max-lg:mx-auto max-md:w-[94%] md:w-2/4 max-sm:!mt-0 max-lg:mt-[-54px] py-6 px-10 flex flex-col xl:w-[400px] bg-purple500 border border-n100 rounded-lg shadow-squareXl shadow-purple300 text-n100">
          <h1 className="max-lg:ml-4 max-lg:text-4xl">Enterprise</h1>
          <h2 className="max-lg:ml-4 max-lg:text-3xl text-orange500">Custom</h2>
          <p className="max-lg:text-xl text-2xl text-n100">Advanced Features to meet you business needs.</p>
          <ul className="my-4 text-lg text-n100">
            <li><Image src={checkWhite} width={24} alt="check" className="h-auto inline mr-4"/>Everything in Pro plan</li>
            <li><Image src={checkWhite} width={24} alt="check" className="h-auto inline mr-4"/>99.99% SLA</li>
            <li><Image src={checkWhite} width={24} alt="check" className="h-auto inline mr-4"/>24 Month History</li>
            <li><Image src={checkWhite} width={24} alt="check" className="h-auto inline mr-4"/>Multi-region compute & failover</li>
            <li><Image src={checkWhite} width={24} alt="check" className="h-auto inline mr-4"/>Advanced Support</li>
          </ul>
          <div className="p-2">
            <Link href="sales" className="mx-auto btn border-2 border-n300 h3 bg-white">Contact Sales!</Link>
          </div>
        </section>

      </div>
    </main>
  );
}

export default Princing;
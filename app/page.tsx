import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import mockup from "@images/browserMockup.png";
import p1 from "@images/p1.png";
import p2 from "@images/p2.png";
import p3 from "@images/p3.png";
import arrow from "@images/arrowRound.svg"
import trustLogo from "@images/trustLogo.svg";
import graph from "@images/graph.svg";
import LeftDash from "@components/svg/leftDash";
import RightDash from "@components/svg/rightDash";
import BarChart from "@components/chart/barChart";



export const metadata: Metadata = {
  title: "Weelytical",
  description: "Real-time analytics, and user-friendly dashboards that empower you to make data-driven decisions with confidence.",
};


const Home = () => {
  
  const data = {
    labels: ['26Jun', '27Jun', '28Jun', "29Jun", "30Jun", "01Jul", "02Jul"],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
        {
          label: 'Visitors',
          data: [29, 25, 37, 55, 57, 45, 67],
          // you can set indiviual colors for each bar
          backgroundColor: "#806190",
          borderRadius: 12,
          barThickness: 30
        }
    ]
};
  
  return (
    <main className="w-full mt-4 lg:mt-8 px-2 lg:px-8 xl:px-20 children">
      <section className="relative h-[650px] lg:h-[700px] xl:h-[790px]">
        
        <LeftDash cName="max-lg:hidden w-[200px] absolute left-[-150px] top-[75px] p-2"/>
        <RightDash cName="max-lg:hidden w-[200px] absolute left-[60px] top-[0px] p-2 rotate-[90deg]"/>
        <RightDash cName="max-lg:hidden w-[100px] xl:w-[150px] absolute right-[50px] xl:right-[350px] top-[600px] xl:top-[500px] p-2 z-10"/>

        <div className="px-6 lg:px-14 py-8 lg:w-[600px] xl:w-[740px] bg-n100 border border-n200 lg:rounded-3xl z-10 absolute lg:-left-4 xl:left-0 top-[215px] lg:top-[270px] xl:top-[300px]">
          <h1 className="text-n800 xl:leading-[76px] text-3xl lg:text-4xl">Powerful Analytics <br/> Easy Integration</h1>
          <p className="mt-4 xl:mt-8 text-sm text-n600 break-all">Unlock the full potential of your data. <br/>{"Experience seamless integration, real-time analytics, and user-friendly dashboards that empower you to make data-driven decisions with confidence. "} 
            {"Whether you're looking to optimize your business processes, understand customer behavior, or forecast trends, our solution provides the precision and depth you need."} </p>
          <Link href="/register/signup" className="mt-4 btn-try">
           Try Free!
           <Image src={arrow} width={35} height={35} loading="lazy" alt="arrow right" className="inline-block pb-1 ml-4"></Image>
          </Link>
        </div>

        <Image src={mockup} width={1038} height={660} priority alt="weelytical" className="!select-none absolute right-0 z-0"></Image>
        
        <div className="absolute top-[110px] lg:top-[210px] right-2 lg:right-[20px] xl:right-[60px]">
          <BarChart chartData={data} classN="p-6 w-96 lg:w-96 xl:w-[500px] bg-orange500 rounded-3xl shadow-md border border-n300"/>
        </div>

        <div className="invisible lg:visible max-w-[200px] text-center absolute right-[80px] xl:right-[160px] top-[480px] xl:top-[525px] z-10">
          <div className="">
            <Image src={graph} width={50} loading="lazy" alt="graph" className="h-auto inline mt-[-30px] mr-2"></Image>
            <h1 className="text-n700 inline p-0 leading-[55px]">32%</h1>
          </div>
          <p className="text-n800 text-xl">Monthly Growth</p>
        </div>

      </section>

      <section className="mx-1 lg:ml-8 xl:ml-0">
        <h3 className="font-bold text-n800">Trusted by:</h3>
        <Image src={trustLogo} width={550} loading="lazy" alt="weelytical" className="h-auto"></Image>
      </section>

      <section className="flex flex-col lg:flex-row gap-14 mt-28">
    	  <div className="px-4 pb-8 shadow-md rounded-3xl flex-1 text-center bg-orange500 border border-n300">
          <Image src={p1} width={200} loading="lazy" alt="thumb" className="mt-[-80px] rounded-[100%] bg-n300 border-[20px] border-white mx-auto"></Image>
          <h2 className="text-n800 mt-4 max-xl:text-2xl mb-2">Michael Thompson</h2>
          <p className="text-lg text-n700">{"\"This analytics platform has revolutionized the way we approach our data strategy. The insights are clear, actionable, and have significantly boosted our campaign performance.\""}</p>
        </div>
    	  <div className="px-4 pb-8 shadow-md rounded-3xl flex-1 text-center bg-orange500 border border-n300">
          <Image src={p2} width={200} loading="lazy" alt="thumb" className="mt-[-80px] rounded-[100%] bg-n300 border-[20px] border-white mx-auto"></Image>
          <h2 className="text-n800 mt-4 max-xl:text-2xl mb-2">Sarah Patel</h2>
          <p className="text-lg text-n700">{"\"The depth of analysis and real-time data capabilities have streamlined our workflow. It's an indispensable tool for our data-driven initiatives.\""}</p>
        </div>
    	  <div className="px-4 pb-8 shadow-md rounded-3xl flex-1 text-center bg-orange500 border border-n300">
          <Image src={p3} width={200} loading="lazy" alt="thumb" className="mt-[-80px] rounded-[100%] bg-n300 border-[20px] border-white mx-auto"></Image>
          <h2 className="text-n800 mt-4 max-xl:text-2xl mb-2">Tom Richards</h2>
          <p className="text-lg text-n700">{"\"The user-friendly interface and powerful analytics tools have made decision-making faster and more accurate. It's a game-changer for our operations.\""}</p>
        </div>
      </section>
      
    </main>
  );
}

export default Home;
"use client"
import {useState, useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import {createClient} from "@utils/supabase/client";
import {project, pageView, chart} from "@utils/types";
import Image from "next/image";
import Link from "next/link";
import open from "@images/open.svg"
import online from "@images/online.svg"
import LineChart from "@components/chart/lineChart"
import Chart from "@components/ui/Chart"
import { parseToChartViews, pageViewTotals, percentDif, onlineUsers } from "@utils/dataParse";

interface charts {
  views: chart,
  visitors: chart,
}
interface stats {
  data: {
    visitors: number,
    pageViews: number
  },
  previous: {
    visitors: number,
    pageViews: number
  },
  online: number
}

const MainCharts = () => {
  const params = useParams<{ projectId: string}>();
  const [currentProject, setCurrentProject] = useState<project>();
  const [charts, setCharts] = useState<charts>();
  const [chart, setChart] = useState<chart>();
  const [data, setData] = useState<Array<pageView>>();
  const [stats, setStats] = useState<stats>();
  const [user, setUser] = useState({});
  const router = useRouter();

 const pageViewsChart =

  

  useEffect(()=> {
    const asyncFunction = async()=> {

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if(user) {
        setUser(user)
      }
     
      const projectsReq = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+'api/getProjects',{
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({userId: user?.id})
      });
    
      const {projects} = await projectsReq.json();

      if(projects.length > 0) {
        setCurrentProject(projects[0]);
        const dataReq = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+'api/getData',{
          method: "POST",
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({projectId: projects[0].project_id, period:7})
        });

        const {data, previousData} = await dataReq.json();
        setData(data);

        setStats({
          previous: pageViewTotals(previousData),
          data: pageViewTotals(data),
          online: onlineUsers(data)
        })
       
        setCharts({
          views: parseToChartViews(data, 7, "Page Views"),
          visitors: parseToChartViews(data, 7, "Visitors")
        });

        setChart(parseToChartViews(data, 7, "Page Views"));
        

      } else {
        router.push("/");
      }
      
     console.log("run");
     
    };

    asyncFunction();
    
  }, []);

  

  const switchChart = (chartObj:chart) => {
    if(chartObj) {
      setChart(chartObj)
    }
  }

//<span className="loading loading-spinner loading-lg bg-n700"></span> 
  return (
    <main className="bg-n100 border border-n300 rounded-b-xl">
      <section className="flex flex-row border-b border-n300">
        {
          currentProject ? 
          <div className="p-4 pl-14 flex flex-1 flex-col">
            <div className="font-jost">
              <h2 className="text-purple900 text-4xl">{ currentProject?.name }</h2>
              <Link href={"https://"+currentProject?.domain!} target="new" className="text-n900 text-2xl h3">
                {currentProject?.domain}
                <Image src={open} width={20} alt="open" className="h-auto inline ml-2 mb-1"/>
              </Link>
              <span className="border-l-2 border-n500 ml-2 pl-2 inline select-none">
                <div className={`${(stats?.online! > 0 ? "border-green-500 bg-green-300" : "border-n300 bg-n200")} -mb-1 mr-2 h-4 w-4 shrink-0 rounded-full border inline-block`}></div>
                {stats?.online||0} Online
              </span>
            </div>
          </div>
          :
          <div className="p-4 pl-14 flex flex-1 flex-row gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-4 w-48"></div>
            </div>
          </div>
        }
        
        {charts?.views! && charts?.visitors! ?
          <div className="flex flex-row-reverse items-stretch">
            <div onClick={()=>switchChart(charts?.views!)} className={`${(chart?.label === "Page Views" ? "border-b-4 bg-n200 text-purple900" : "text-n700")} active:bg-n300 hover:border-b-4 flex flex-col pt-8 px-8 font-jost border-purple500 cursor-pointer transition ease-in-out duration-500`}>
              <p className="flex place-self-end font-medium">Page Views</p>
              <div className="flex items-center">
                <h1 className="inline text-4xl">{stats?.data.pageViews}</h1>
                
                <div className="inline ml-2 py-1 px-2 text-center rounded-lg bg-green-200 bg-opacity-70 text-green-700 !text-sm">
                  <span>{percentDif(stats?.data.pageViews!, stats?.previous.pageViews!)}%</span>
                </div>
              </div>   
            </div>
            <div onClick={()=>switchChart(charts?.visitors!)} className={`${(chart?.label === "Visitors" ? "border-b-4 bg-n200 text-purple900" : "text-n700")} active:bg-n300 hover:border-b-4 flex flex-col pt-8 px-8 font-jost border-purple500 cursor-pointer transition ease-in-out duration-500`}>
              <p className="flex place-self-end">Visitors</p>
              <div className="flex items-center">
                <h1 className="inline text-4xl">{stats?.data.visitors}</h1>
                <div className={`${(percentDif(stats?.data.visitors!, stats?.previous.visitors!) < 0 ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700")} inline ml-3 py-1 px-2 text-center rounded-lg bg-opacity-70 text-sm`}>
                  <span>
                    {percentDif(stats?.data.visitors!, stats?.previous.visitors!) < 0 ? "" : "+"}
                    {percentDif(stats?.data.visitors!, stats?.previous.visitors!)}%</span>
                </div>
              </div>   
            </div>
          </div>
        :
        <div className="flex flex-row-reverse items-stretch">
          <div className="p-4 pl-14 flex flex-1 flex-row gap-4">
            <div className="flex flex-col gap-4 mt-2">
              <div className="skeleton h-4 w-32 self-end"></div>
              <div className="skeleton h-4 w-48"></div>
            </div>
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          </div>
        </div>
        }
          
        
      </section>
      
      <section className="flex flex-col bg-white bg-opacity-50">
        {
          chart?
          <LineChart chartData={chart} classN={"w-full h-[400px] px-4 my-8" }></LineChart>
          :
          <span className="loading loading-spinner w-28 bg-n700 mx-auto my-20"></span>
        }
      </section>
      
      
    </main>

  );
}

export default MainCharts;
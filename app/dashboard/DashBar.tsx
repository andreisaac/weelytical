"use client"
import {useState, useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import React from "react";
import PeriodButton from "@components/ui/PeriodButton";
import OptionsButton from "@components/ui/OptionsButton";
import SelectProjectsButton from "@components/ui/SelectProjectsButton";
import {project} from "@utils/types" 

type dashbarProps = {
  projects: project[]
}



const DashBar = ({projects} : dashbarProps) => {
  const [toggle, setToggle] = useState({options: false, period: false, project: false});
  const [animation, setAnimation] = useState({options: false, period: false, project: false});
  const [currentProject, setCurrentProject] = useState<project>();
  const {projectId} = useParams<{ projectId: string}>();
  const router = useRouter();
  
  useEffect(()=> {
    if(projectId) {
      const current = projects.filter((item)=> item.project_id === projectId)[0]
      if(current){
        setCurrentProject(current);
      } else if(projects.length > 0) {
        router.push("/dashboard/" + projects[0].project_id);
      } else {
        router.push("/error");
      }
    } else {
      setCurrentProject(projects[0]);
    }
  },[projectId]);
  
  const onClick = (type: string) => {
    const obj = {
      options: type === "options" ? !toggle.options : false, 
      period: type === "period" ? !toggle.period : false,
      project: type === "project" ? !toggle.project : false
    }

    if(toggle.options || toggle.period || toggle.project) {
      setTimeout(() => (
        setAnimation(obj)
      ), 210);
        setToggle(obj);
        
    } else {
      setToggle(obj);
      setTimeout(() => (
        setAnimation(obj)
      ), 10);
    }

  };

  return (
    <section className=" max-md:flex-col px-4 flex flex-row bg-n700 border border-n300 rounded-t-lg">
    <div className="max-md:mx-auto flex flex-1 flex-row">
      <SelectProjectsButton projects={projects} currentProject={currentProject!} onClick={()=>onClick("project")} toggle={toggle?.project} animation={animation?.project}/>
    </div>
    <div className="max-md:mx-auto flex flex-row-reverse">
      <OptionsButton onClick={()=>onClick("options")} toggle={toggle?.options} animation={animation?.options}></OptionsButton>
      <PeriodButton onClick={()=>onClick("period")} toggle={toggle?.period} animation={animation?.period}></PeriodButton>
    </div>
  </section>
  );
}

export default DashBar;
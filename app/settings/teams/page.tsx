"use client"
import {useState, useEffect} from "react";
import uid from "@utils/uid";
import Image from "next/image";
import project from "@images/project.svg";

interface members {
  id: string,
  display: string,
  email: string,
  role: string,
  avatar: string
}
interface teams {
  id: string,
  name: string,
  members: members[]
}

let t: Array<teams> = [{
  id: uid(),
  name: "Flor do Jamor",
  members: [
    {id:uid(), role: "Owner", display: "Manel", avatar:"1", email: "andrsdedisaac@gmail.com"},
    {id:uid(), role: "Lead", display: "André", avatar:"2", email: "andredisaac@gmail.com"},
    {id:uid(), role: "Member", display: "Tozé", avatar:"3", email: "someshitmail@cona.pt"}
  ],
}, {
  id: uid(),
  name: "Weelytical",
  members: [
    {id:uid(), role: "Owner", display: "Manel", avatar:"1", email: "andrsdedisaac@gmail.com"},
    {id:uid(), role: "Lead", display: "André", avatar:"2", email: "andredisaac@gmail.com"},
    {id:uid(), role: "Member", display: "Tozé", avatar:"3", email: "someshitmail@cona.pt"}
  ],
}];

let sessi:members = {id:uid(), role: "Owner", display: "Manel", avatar:"purpleBlack", email: "andrsdedisaac@gmail.com"}

const Authentication = () => {
  const [session, setSession] = useState<members>(sessi);
  const [selection, setSelection] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState(t);

  useEffect(()=>{
    const asyncFunc = async()=>{
      
    };
    asyncFunc();
  },[]);

  const select = (id:string, tid:string) => {
    if(selectedTeam === tid) {
      if(selection.find((item:string)=> item === id)) {
        setSelection(selection.filter((item:string)=>item !== id))
      } else {
        setSelection([...selection, id]);
      }
    } else {
      setSelectedTeam(tid);
      setSelection([id]);
    }
    
  };


  return (
    <main className="flex-1 py-8 flex flex-col gap-4 children">
      <section className="mx-10 mt-2">
        <h2>Teams</h2>
        <p>Manage the Teams that you're a part of, join suggested ones, or create a new one.</p>
      </section>

      {teams.map((item)=>
        <div key={item.id}>
        <section className="px-8 py-4 mx-10 bg-n900 border border-n300 flex flex-row gap-4 items-center rounded-lg">
          <Image src={project} alt="project" loading="lazy" className="h-12 2-12"/>
          <div className="flex-1">
            <p className="py-0 font-medium text-n100 text-2xl font-jost">{item.name}</p>
          </div>

          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn bg-opacity-0 border-0 !text-3xl !font-black hover:bg-n700">
              <span className="mt-[-15px] text-n100">...</span>
            </div>
            <ul tabIndex={0} className="text-n100 dropdown-content menu bg-n900 rounded-lg z-[1] w-52 p-2 shadow border border-n500">
    
              <li><a className="text-red900 font-medium" onClick={()=>(null)}>Leave team</a></li>
            </ul>
          </div>
        </section>
        
        
        <section className="px-8 py-4 mx-12 mt-[-1px] bg-n100 border border-n300 flex flex-col gap-2  rounded-b-lg">

        {selection.length > 0 && selectedTeam === item.id ? 
          <div className="flex flex-row gap-4 children">
            <a className="btn btn-neutral">Promote</a>
            <a className="btn btn-error btn-md">Expel</a>
          </div> : ""}

        <h3 className="divider">Team Members</h3>

        {item.members.map((it)=>
          <div className="grid grid-cols-12 gap-4 items-center">
            <div>
              <label className={it.id && session.id && (session.role === "Admin" || session.role === "Owner") ? "visible" : "hidden"}>
                <input type="checkbox" className="checkbox" value={it.id} onChange={()=>select(it.id, item.id)} checked={selection.find(i => i === it.id) ? true : false}/>
              </label>
            </div>
            <div className="col-span-10 flex flex-row gap-4">
              {it.avatar ==="1" ? 
                <div className={"bg-blueGreen w-10 h-10 rounded-full"}/> : ""}
              {it.avatar ==="2" ? 
                <div className={"bg-pinkPurple w-10 h-10 rounded-full"}/> : ""}
              {it.avatar === "3" ? 
                <div className={"bg-greenYellow w-10 h-10 rounded-full"}/> :  ""}
              <div>
                <p className="py-0 font-medium text-n800">{it.display}</p>
                <p className="py-0 text-sm text-n500 font-medium">{it.role}</p>
              </div>
            </div>
            <div className={"place-self-end " + it.id && session.id && (session.role === "Admin" || session.role === "Owner") ? "visible" : "hidden"}>
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn bg-opacity-0 border-0 !text-3xl !font-black hover:bg-n200">
                  <span className="mt-[-15px] text-n800">...</span>
                </div>
                <ul tabIndex={0} className="text-n700 dropdown-content menu bg-n200 rounded-lg z-[1] w-52 p-2 shadow border border-n500">
                  {it.role !== "Owner" && it.role !== "Admin" ? <li><a className="font-medium" onClick={()=>(null)}>Promote</a></li> : "" }
                  <li><a className="text-red900 font-medium" onClick={()=>(null)}>Expel from team</a></li>
                </ul>
              </div>
            </div>
          </div>
        )}
        </section>

        
        </div>
      )}


      

      



    </main>
  );
}

export default Authentication;
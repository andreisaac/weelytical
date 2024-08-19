"use client"
import {useEffect, useState, useRef} from "react";
import uid from "@utils/uid"
import Image from "next/image";
import cardSVG from "@images/card.svg";
import cardOSVG from "@images/cardOrange.svg";
import CreditInput from "@components/form/CreditInput";
import {createClient} from "@utils/supabase/client"
import {project} from "@utils/types"

//augment the interface to control the modal
interface dial extends HTMLDialogElement {
  close(): void;
  closeModal(): void;
  close(returnValue?: string): void;
}
  

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

const Billing = () => {
  const [projects, setProjects] = useState<Array<project>>();
  const [session, setSession] = useState<members>(sessi);
  const [card, setCard] = useState({});
  const [error, setError] = useState("");
  //card form modal
  const modal = useRef<dial>(null);
  const supabase = createClient();

  useEffect(()=>{
    const asyncFunc = async()=>{
      const { data, error } = await supabase.auth.getSession();

      const userId = data.session?.user.id;

      const req = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+"api/getProjects", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({owner: userId})
      });

      const {projects} =  await req.json();
      setProjects(projects);
      
    };
    asyncFunc();
  },[]);

  // controls for the modal
  const openDialog = () => {
    if (modal.current) {
      modal.current.showModal();
    }
  };
  const closeDialog = () => {
    if (modal.current) {
      modal.current.close();
    }
  };

  {/* handle card submit*/ }

  const submitCard = () => {
    {/* handle logic and api calls*/ }
    closeDialog()
  }

  return (
    <main className="flex-1 py-8 flex flex-col gap-4 children">
      <section className="mx-10 mt-8 bg-n100 border border-n300 rounded-lg">
        <div className="py-4 px-10">
          <h3>Projects own</h3>
        </div>
        <div className="px-20 flex flex-row my-2">
          <p className="flex-1">Name:</p>
          <p className="flex-1">Type:</p>
          <p className="flex-1">Subscription</p>
          <p className="w-14"></p>
          
        </div>
        <div className="px-10 py-2 mx-8 mb-8 border border-n300 rounded-lg bg-n700 min-h-12">
          {Array.isArray(projects) === true ? projects.map((item)=>{
            return (
            <div className="flex flex-row items-center text-white my-2">
              <p className="flex-1">{item.name}</p>
              <p className="flex-1">{item.type.charAt(0).toUpperCase() + item.type.slice(1) }</p>
              <p className="flex-1">{item.valid ? item.type ? "Not necessary" : "Payed" : "Unpaid"}</p>
              <div className="dropdown dropdown-bottom dropdown-end rounded-lg">
                <div tabIndex={0} role="button" className="btn bg-opacity-0 border-0 !text-3xl !font-black !bg-n200 hover:!bg-n100">
                  <span className="mt-[-15px] text-n800">...</span>
                </div>
                <ul tabIndex={0} className="text-n700 dropdown-content menu bg-n200 rounded-lg z-[1] w-52 p-2 shadow border border-n500">
                  <li><a className="hover:bg-n100">Upgrade Project Plan</a></li>
                  <li><a className="hover:bg-n100 text-red900">Delete {item.name}</a></li>
                </ul>
              </div>
            </div>
            )
          }) : null }
        </div>
      </section>

      <section className="mx-10 mt-8 bg-n100 border border-n300 rounded-lg">
        <div className="py-4 px-10">
          <h3>Payment Method</h3>
        </div>
        <p className="pb-4 px-10">Payments for domains, add-ons, and other usage are made using the default card.</p>

        {
        //credit cards display
        }
        <div className="px-10 py-2 m-8 border border-n300 rounded-lg bg-white min-h-44">
          <div className="flex flex-row items-center">
            <Image src={cardSVG} width={25} height={25} alt="credit card" loading="lazy"/>
            <p className="ml-4">Credit card <span className="-mt-4">... </span> 0395</p>
            <div className="ml-4 badge badge-primary bg-opacity-75">Default</div>
            <div className="ml-4 badge badge-secondary bg-opacity-75">Secondary</div>
            <div className="flex-1 text-right">
              <a className="btn btn-sm pb-1">...</a>
            </div>
          </div>
        </div>

        {
        //no credit cards
        }
        <div className="m-8 border border-n300 rounded-lg bg-white">
          <div className="border border-n300 mx-auto p-3 my-8 w-20 rounded-lg bg-n100">
            <Image src={cardSVG} width={50} height={50} alt="credit card" loading="lazy"/>
          </div>
        </div>

        <div className="px-10 py-2 flex flex-row border-t border-n300">
          <span className="flex-1 self-center">At most, three credit cards, debit cards or prepaid cards can be added.</span>
          <a className="btn-dash !bg-white hover:!bg-n200" onClick={openDialog}>Add Card</a>
        </div>
      </section>
    	
      {
      //add credit card modal
      }
      <dialog ref={modal} className="modal">
        <div className="modal-box bg-n100 rounded-xl border border-n700 p-0">
          <div className="py-4 px-8 bg-n800 border-b border-n500 roundedt-t-2xl">
            <h2 className="pt-2 text-n100 text-3xl">
              <Image src={cardOSVG} width={40} height={40} className="inline pb-2 mr-4" alt="credit card" loading="lazy"/> Add Card
            </h2>
          </div>
          <p className="py-4 px-8">Add a payment card for</p>
          <div className="py-4 px-8">
            <CreditInput inputUpdate={setCard} errorUpdate={setError}/>

          </div>

          <div className="py-4 px-8 bg-n200 border-t border-n500 rounded-b-2xl">
            <a className="btn-dash !border-2 !bg-n200 hover:!bg-n300" onClick={closeDialog}>Cancel</a>
            <a className="btn-dash !bg-white hover:!bg-n100 float-end" onClick={submitCard}>Continue</a>
          </div>
        </div>
      </dialog>
    </main>
  );
}

export default Billing;
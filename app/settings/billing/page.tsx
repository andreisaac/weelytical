"use client"
import { useState, useRef} from "react";
import uid from "@utils/uid";
import Image from "next/image";
import cardSVG from "@images/card.svg";
import cardOSVG from "@images/cardOrange.svg";
import CreditInput from "@components/form/CreditInput";
import {createClient} from "@utils/supabase/client";
import {project} from "@utils/types";
import { useUserContext } from '../../../context/userContext';
import { useProjectsContext } from '../../../context/projectsContext';
import { usePlanContext } from '../../../context/planContext';

//augment the interface to control the modal
interface dial extends HTMLDialogElement {
  close(): void;
  closeModal(): void;
  close(returnValue?: string): void;
}
  

const Billing = () => {
  const [error, setError] = useState("");
  const modal = useRef<dial>(null);
  const {user} = useUserContext();
  const {projects} = useProjectsContext();
  const {plan, dispatch} = usePlanContext();
  
  const link = process.env.NODE_ENV === 'development' ? "https://buy.stripe.com/test_14kdSA9gJ9d31na7ss" : "https://buy.stripe.com/5kAbLl4sG4yp81yfYZ";

  const cancelSub = async() =>{
    if(user && plan) {
      const req = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+'api/cancelPlan',{
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({plan})
      });

      const {updatedPlan} = await req.json();

      if(updatedPlan && updatedPlan[0]) {
        dispatch({type: "setPlan", payload: updatedPlan[0]})
      }
    }
  }

  const cancelDate = (date: string) => {
    const d = new Date(date);
    return (d.getDate() < 10 ? ("0"+d.getDate()) : d.getDate()) + "/" + ((d.getMonth()+1) < 10 ? ("0"+(d.getMonth()+1)) : (d.getMonth()+1));
  }

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
    <main className="mx-2 lg:mx-10 flex-1 py-4 lg:py-8 flex flex-col gap-4 children text-sm lg:text-base">

      <section className="mt-2 pt-2 lg:mt-8 bg-n100 border border-n300 rounded-lg">
        <div className="py-4 px-4 lg:px-10">
          <h3>My Projects</h3>
        </div>

        <div className="max-lg:pl-5 lg:px-20 flex flex-row my-2">
          <p className="flex-1">Name:</p>
          <p className="flex-1">Role:</p>
          <p className="flex-1"></p>
          <p className="w-14"></p>
          
        </div>

        <div className="px-2 lg:px-10 py-2 mx-1 lg:mx-8 mb-4 lg:mb-8 border border-n300 rounded-lg bg-n700 min-h-12">
          {Array.isArray(projects) === true ? projects.map((item)=>{
            return (
            <div key={item.project_id} className="flex flex-row items-center text-white my-2">
              <p className="flex-1">{item.name}</p>
              <p className="flex-1">{item.owner === user?.id ? "Owner" : "Member"}</p>
              <p className="flex-1"></p>
              <div className="dropdown dropdown-bottom dropdown-end rounded-lg">
                <div tabIndex={0} role="button" className="btn max-lg:btn-xs bg-opacity-0 border-0 !text-3xl !font-black !bg-n200 hover:!bg-n100">
                  <span className="mt-[-15px] text-n800">...</span>
                </div>
                <ul tabIndex={0} className="text-n700 dropdown-content menu bg-n200 rounded-lg z-[1] w-52 p-2 shadow border border-n500">
                  <li><a className="hover:bg-n100 text-red900">{item.owner === user?.id ? "Delete " : "Leave"} {item.name}</a></li>
                </ul>
              </div>
            </div>
            )
          }) : <div className="text-center my-2"><span className="loading loading-spinner loading-lg bg-n100"></span></div>  }
        </div>
      </section>

      <section className="mt-2 pt-2 lg:mt-8 bg-n100 border border-n300 rounded-lg">
        <div className="py-4 px-4 lg:px-10">
          <h3>Current Plan:</h3>
        </div>

        
          <div className="max-lg:pl-5 lg:px-20 flex flex-row my-2">
            <p className="flex-1">Plan:</p>
            <p className="flex-1">Status:</p>
            <p className="flex-1"></p>
            <p className="w-14"></p>
          </div>

          <div className="px-2 lg:px-10 py-2 mx-1 lg:mx-8 mb-4 lg:mb-8 border border-n300 rounded-lg bg-white min-h-12">
            
            {plan ? 
              <div className="flex flex-row items-center text-n700 my-2 font-medium">
                <p className="flex-1 text-purple500">{plan?.type}</p>
                <p className={plan?.status && !plan?.cancel_date ? "flex-1 text-green-600" : plan?.cancel_date ? "flex-1 text-orange-400" : "flex-1 text-red-900"}>{plan?.status && !plan?.cancel_date ? "Active" : plan?.cancel_date ? "Canceled at "+cancelDate(plan?.cancel_date) : "Inactive"}</p>
                <p className="flex-1"></p>
                {!plan?.cancel_date ?
                (
                  <div className="dropdown dropdown-bottom dropdown-end rounded-lg">
                      <div tabIndex={0} role="button" className="btn max-lg:btn-xs bg-opacity-0 border-n300 !text-3xl !font-black !bg-n100 hover:!bg-n100">
                        <span className="mt-[-15px] text-n800">...</span>
                      </div>
                      <ul tabIndex={0} className="text-n700 dropdown-content menu bg-n100 rounded-lg z-[1] w-52 p-2 shadow border border-n300">
                        
                        {plan?.type === "Hobby" ? <li><a className="hover:bg-n100" target="_blank" href={ link + '?prefilled_email=' + user?.email }>Upgrade to Pro Plan</a></li> :  <li><a className="hover:bg-n100 text-red900" onClick={cancelSub}>Cancel Subscription</a></li> }
                      </ul>
                  </div>)
                : 
                null
                }
              </div>
            : 
              <div className="text-center my-2"><span className="loading loading-spinner loading-lg bg-n700"></span></div>
            }
            
          </div>

       

        {
        //credit cards display
        /*
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
        <div className="m-2 lg:m-8 border border-n300 rounded-lg bg-white">
          <div className="border border-n300 mx-auto p-3 my-8 w-20 rounded-lg bg-n100">
            <Image src={cardSVG} width={50} height={50} alt="credit card" loading="lazy"/>
          </div>
        </div>

        <div className="px-4 lg:px-10 py-2 lg:flex lg:flex-row border-t border-n300">
          <p className="flex-1 self-center">At most, three credit cards, debit cards or prepaid cards can be added.</p>
          <a className="max-lg:float-right max-lg:my-2 btn-dash !bg-white hover:!bg-n200" onClick={openDialog}>Add Card</a>
        </div>
        */
    }
      </section>
    	
      {
      //add credit card modal
      /*
      <dialog ref={modal} className="modal">
        <div className="modal-box bg-n100 rounded-xl border border-n700 p-0 max-lg:-mt-74 max-lg:w-[98%]">
          <div className="py-2 lg:py-4 px-8 bg-n800 border-b border-n500 roundedt-t-2xl">
            <h2 className="pt-2 text-n100 text-xl lg:text-3xl">
              <Image src={cardOSVG} width={40} height={40} className="inline pb-2 mr-4" alt="credit card" loading="lazy"/> Add Card
            </h2>
          </div>
          <p className="py-4 px-3 lg:px-8">Add a payment card for</p>
          <div className="max-lg:pb-4 lg:py-4 px-2 lg:px-8">
            <CreditInput inputUpdate={setCard} errorUpdate={setError}/>

          </div>

          <div className="py-4 px-8 bg-n200 border-t border-n500 rounded-b-2xl">
            <a className="btn-dash !border-2 !bg-n200 hover:!bg-n300" onClick={closeDialog}>Cancel</a>
            <a className="btn-dash !bg-white hover:!bg-n100 float-end" onClick={submitCard}>Continue</a>
          </div>
        </div>
      </dialog>
      */
      }
    </main>
  );
}

export default Billing;
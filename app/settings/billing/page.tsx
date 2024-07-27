"use client"
import {useState, useRef} from "react";
import uid from "@utils/uid"
import Image from "next/image";
import cardSVG from "@images/card.svg";
import cardOSVG from "@images/cardOrange.svg";
import CreditInput from "@components/form/CreditInput";

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
  const [session, setSession] = useState<members>(sessi);
  const [card, setCard] = useState({});
  const [error, setError] = useState("");
  //card form modal
  const modal = useRef<dial>(null);
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
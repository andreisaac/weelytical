"use client"
import {useState, useRef} from "react";
import Image from "next/image";
import fileSearch from "@images/fileSearch.svg";


const Invoices = () => {


  return (
    <main className="flex-1 py-8 flex flex-col gap-4 children">
      <section className="mx-4 lg:mx-10 bg-n100 border border-n300 rounded-lg">
        <div className="px-4 lg:px-8 py-14 border-b border-n300 text-center">
          <Image src={fileSearch} width={60} height={60} alt="file seach" className="mb-4 p-4 mx-auto border border-n300 rounded-lg"/>
          <h3>No Invoices</h3>
          <p>{"You currently don\'t have any invoices."}</p>
        </div>
      </section>
    </main>
  );
}

export default Invoices;
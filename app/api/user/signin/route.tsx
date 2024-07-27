'use server'
import {cookies} from "next/headers";
import {createClient} from "@utils/supabase/server";

export async function POST(req: Request) {
    const d = await req.json();
    const {email, password} = d;
    
    if(email && password) {
      const { data, error } = await createClient().auth.signInWithPassword(
        {
        email,
        password
      }
    );
      if (error) console.log(error)      
      else {
        console.log(data?.user);
      }
    }

    return Response.json({msg: "success"})
  }


'use server'
import {cookies} from "next/headers";
import {supabase} from "@utils/supabase/server";

export async function POST(req: Request) {
    const d = await req.json();
    const {email, password, type, projectName, displayName} = d;
    
    if(email && password && type && projectName && displayName) {
      const { data, error } = await supabase.auth.signUp(
        {
        email,
        password,
        options: {
          data: {displayName, type, projectName}
        }
      }
    );
      if (error) console.log(error)      
      else {
        console.log(data?.user);
      }
    }

    return Response.json({msg: "test this"})
  }


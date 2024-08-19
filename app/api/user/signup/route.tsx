'use server'
import {createClient} from "@utils/supabase/server";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const supabase = createClient();
  const d = await req.json();
  const {email, password, displayName, type} = d;

  
  if(email && password && displayName) {

    const { data, error } = await supabase.auth.signUp(
      {
      email,
      password, 
      options:{
        data:{
          display_name: displayName
        }
      }
      }
    );
  
    if (error) console.log(error) 
    else {
      console.log(data);
      try{
      } catch (e) {
        return Response.json({e})
      }
      
    }
    return Response.json({success: "User signup successfull."})
  }
};
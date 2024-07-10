'use server'
import {cookies} from "next/headers";
import {hashSync, genSaltSync} from "bcrypt-ts";

export async function POST(req: Request) {
    const data = await req.json();
    
    if(data.type && data.projectName) {
      cookies().set('type', data.type, {httpOnly: true, path: '/register'});
      cookies().set('projectName', data.projectName, {httpOnly: true, path: '/register'});
    }

    if(data.email && data.password) {
      cookies().set('email', data.email, {httpOnly: true, path: '/register'});
      cookies().set('verification', Math.floor(10000 + Math.random() * 90000).toString(), {httpOnly: true, path: '/register'});
    }

    return Response.json({msg: "Cookie set!"})
  }

 
  export async function DELETE(req: Request) {
    const data = await req.json();

    if(data.clean) { 
      cookies().set('type', "", {expires: new Date(Date.now()), httpOnly: true, path: '/register'});
      cookies().set('projectName',"", {expires: new Date(Date.now()), httpOnly: true, path: '/register'});
      cookies().set('email', "", {expires: new Date(Date.now()), httpOnly: true, path: '/register'});
      cookies().set('verification', "", {expires: new Date(Date.now()), httpOnly: true, path: '/register'});
    }
    
    if(data.type && data.projectName) {
      cookies().set('type', "", {expires: new Date(Date.now()), httpOnly: true, path: '/register'});
      cookies().set('projectName', "", {expires: new Date(Date.now()), httpOnly: true, path: '/register'});
    }

    if(data.email) {
      cookies().set('email', "", {expires: new Date(Date.now()), httpOnly: true, path: '/register'});
    }

    return Response.json({msg: "Cookie set!"})
  }
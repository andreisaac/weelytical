"use client";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import { useUserContext } from '../../context/userContext';
import {createClient} from "@utils/supabase/client";




const SocialRedirect = () => {
    const router = useRouter();
    const supabase = createClient();
    const {user, dispatch} = useUserContext();
    useEffect(()=>{
        const asyncFunc = async ()=> {
            const { data: { user } } = await supabase.auth.getUser()
            if(user) {
                dispatch({type: "setUser", payload: user});
                router.push("/dashboard");
            } else {
                router.push("/signIn");
            }
        }
    });

  return null
}

export default SocialRedirect;
"use client"
import { createContext, useContext, useReducer,useEffect } from 'react';
import {createClient } from "@utils/supabase/client";
import { useUserContext } from './userContext';




const supabase = createClient();

// Create a context to hold the state
const PlansContext = createContext();

// Define the initial state
const initialState = null;

// Define the reducer function to handle state transitions
const reducer = (plan, action) => {
    if (action.type === 'setPlan') {
      return action.payload;
    } else if (action.type === 'clearPlan') {
      return null;
    } else {
      throw Error('Unknown action: ' + action.type);
    }
}


// Create a component that will provide the context
// IncrementProvider takes in an argument called children
const PlansProvider = ( {children} ) => {
  const [plan, dispatch] = useReducer(reducer, initialState);
  const {user} = useUserContext();

  useEffect(()=>{
    const asyncFunc = async() => {
      
      if(user) {
        const plansReq = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+'api/getPlans',{
          method: "POST",
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({userId: user?.id})
        });
    
        const {plan} = await plansReq.json();

        
        if(plan) {
          dispatch({type: "setPlan", payload: plan[0]})
        }
      }
    };

    asyncFunc();

  },[user])

// In this return value, we passed-in children as the CONSUMER of the PROVIDER
// This will able children components to access the data inside the context
  return (
    <PlansContext.Provider value={{plan, dispatch }}>
      
        {children}
      
    </PlansContext.Provider>
  );
}

export default PlansProvider;

// Create a function that invokes the context 
export const usePlanContext = () => {
  return useContext(PlansContext)
}
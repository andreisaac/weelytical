"use client"
import { createContext, useContext, useReducer,useEffect } from 'react';
import {createClient } from "@utils/supabase/client";


const supabase = createClient();

// Create a context to hold the state
const UserContext = createContext();

// Define the initial state
const initialState = null;

// Define the reducer function to handle state transitions
const reducer = (user, action) => {
    if (action.type === 'setUser') {
      return action.payload;
    } else if (action.type === 'signOut') {
      return null;
    } else {
      throw Error('Unknown action: ' + action.type);
    }
  }


// Create a component that will provide the context
// IncrementProvider takes in an argument called children
const UserProvider = ( {children} ) => {
  const [user, dispatch] = useReducer(reducer, initialState);
  useEffect(()=>{
    const asyncFunc = async() => {
      const { data } = await supabase.auth.getUser();
      if(data.user) {
        dispatch({type: "setUser", payload: data.user});
      } else {
        return null
      }
    };
    asyncFunc();
  },[])
// In this return value, we passed-in children as the CONSUMER of the PROVIDER
// This will able children components to access the data inside the context
  return (
    <UserContext.Provider value={{user, dispatch }}>
      
        {children}
      
    </UserContext.Provider>
  );
}

export default UserProvider;

// Create a function that invokes the context 
export const useUserContext = () => {
  return useContext(UserContext)
}